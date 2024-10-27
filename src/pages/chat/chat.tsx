import Header from "../../components/header/header.tsx";
import styles from "./chat.module.css"
import Message from "./message/message.tsx";
import {Link, useParams} from "react-router-dom";
import backArrow from "../../assets/arrow-back.svg"
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {UserType} from "../../types/types.ts";
import axios from "axios";
import NotFound from "../../components/notFound/notFound.tsx";

const Chat = () => {

    const messages = [
        {
            message: "lorem ipsum is dolor text 123sdfds f  DFDS FFD f x AsdsxcASDFVCADSGFDGADSFDSAGADSGFSFDSFDSFDSFDSFSFSDFDSFDSFDSFDSFDSFSDFSD lol ya lol kek 123",
            isAuthor: false,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        },
        {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        },
        {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        },
        {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        },
        {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        }, {
            message: "lorem ipsum is dolor text 123 lol ya lol kek 123",
            isAuthor: true,
            profile_image: "http://127.0.0.1:8000/uploads/default.jpg",
        },


    ]

    const id = Number(useParams().id)

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [companion, setCompanion] = useState<UserType | null>(null)
    const [socket, setSocket] = useState<WebSocket | null>(null)

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
        const fetchCompanion = () => {
            axios.get<UserType>(`http://localhost:8000/api/users/${id}`).then((res) => {
                setCompanion(res.data)
            }).finally(() => {
                setIsLoading(false);
            })
        }

        if (isLoading && !companion) {
            fetchCompanion()
        }

    }, [companion, id, isLoading]);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${id}/send-message/`)
        setSocket(socket)
        socket.onmessage = (e: MessageEvent<string>)=>{
            console.log(e.data)
        }
        return ()=>{
            socket.close()
        }
    }, []);

    const handleSend = () => {
        if(socket){
            socket.send("fsfdsfds")
        }
    }

    return (
        <>
            <Header/>
            {isLoading ? <div>Loading...</div> :
                companion ? <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <Link className={styles.header__link} to={"/chats"}><img className={styles.header__back_arrow}
                                                                                 src={backArrow} alt="back"/></Link>
                        <div className={styles.title}>{companion.username}</div>
                    </div>
                    <div className={styles.chat}>
                        {messages.map((message, index) => <Message key={index} isAuthor={message.isAuthor}
                                                                   message={message.message}
                                                                   profile_image={message.profile_image}/>)}
                    </div>
                    <div className={styles.input_wrapper}>
                        <textarea value={text} onChange={handleInput} rows={1} ref={textareaRef}
                                  className={styles.input}/>
                        <div className={styles.button_wrapper}>
                            <button onClick={handleSend} className={styles.button}>Send</button>
                        </div>
                    </div>
                </div> : <NotFound/>}
        </>
    )
}

export default Chat