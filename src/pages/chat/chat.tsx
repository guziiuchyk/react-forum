import Header from "../../components/header/header.tsx";
import styles from "./chat.module.css"
import Message from "./message/message.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import backArrow from "../../assets/arrow-back.svg"
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {GetApiPaginationGeneric, MessageType, UserType} from "../../types/types.ts";
import axios, {AxiosError} from "axios";
import NotFound from "../../components/notFound/notFound.tsx";
import useAuth from "../../hooks/useAuth.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

const Chat = () => {
    const id = Number(useParams().id)

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [companion, setCompanion] = useState<UserType | null>(null)
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [messages, setMessages] = useState<MessageType[]>([])
    const [conversationId, setConversationId] = useState<number | null>(null)
    const navigate = useNavigate();

    const userId = useSelector((state: RootState) => state.user.user?.id);

    const isAuth = useAuth()

    useEffect(() => {
        if (isAuth === false) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement> | null = null) => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            window.scrollTo({
                top: document.body.scrollHeight,
            });
        }
        if (e) {
            setText(e.target.value)
        }
    };

    useEffect(() => {
        handleInput();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get<GetApiPaginationGeneric<UserType>>(`http://localhost:8000/api/users/${id}`)
                setCompanion(userResponse.data.items[0])
            } catch {
                navigate("/not-found");
            }
            try {
                const messagesResponse = await axios.get<GetApiPaginationGeneric<MessageType>>(`http://localhost:8000/api/chats/${id}`, {withCredentials: true})
                setMessages(messagesResponse.data.items)
                setConversationId(messagesResponse.data.items[0].conversation_id)
            } catch (err: unknown) {

                const error = err as AxiosError;

                if (error.response?.status === 400) {
                    console.log(400)
                    setConversationId(-1)
                }
            }
            setIsLoading(false);
        }

        if (isLoading && !companion) {
            fetchData()
        }

    }, [companion, id, isLoading, navigate]);

    useEffect(() => {
        if (conversationId && conversationId > 0) {
            const socket = new WebSocket(`ws://localhost:8000/ws/chats/${conversationId}`)
            setSocket(socket)
            socket.onmessage = (e: MessageEvent<string>) => {
                setMessages(prevState => [...prevState, JSON.parse(e.data) as MessageType])
            }
            return () => {
                socket.close()
            }
        }
    }, [conversationId]);

    const handleSend = () => {

        if (text.trim() === "") {
            return;
        }

        if (socket) {
            socket.send(JSON.stringify({content: text, files: []}))
            setText("")
            return;
        }
        if (conversationId === -1) {
            axios.post(`http://localhost:8000/api/chats/${id}/send-message`, {content: text}, {withCredentials: true}).then((response) => {
                console.log(response)
                window.location.reload();
            })
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.shiftKey) {
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            handleSend()
        }
    };

    return (
        <>
            <Header/>
            {isLoading ? <div>Loading...</div> :
                companion ? <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <Link className={styles.header__link} to={"/chats"}><img className={styles.header__back_arrow}
                                                                                 src={backArrow} alt="back"/></Link>
                        <Link className={styles.header__link_to_companion} to={`/profile/${id}`}>
                            <img className={styles.header__img} src={companion.profile_picture} alt="profile"/>
                            <div className={styles.title}>{companion.username}</div>
                        </Link>
                    </div>
                    <div className={styles.chat}>
                        {messages.map((message, index) => <Message id={message.id} key={index}
                                                                   isAuthor={message.sender_id === Number(userId)}
                                                                   message={message.content}
                                                                   profile_image={message.profile_picture}/>)}
                    </div>
                    <div className={styles.input_wrapper}>
                        <textarea value={text} onChange={handleInput} rows={1} ref={textareaRef}
                                  className={styles.input} onKeyDown={handleKeyDown}/>
                        <div className={styles.button_wrapper}>
                            <button onClick={handleSend} className={styles.button}>Send</button>
                        </div>
                    </div>
                </div> : <NotFound/>}
        </>
    )
}

export default Chat