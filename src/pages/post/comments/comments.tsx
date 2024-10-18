import React, {useEffect, useRef, useState} from "react";
import Comment from "./comment/comment.tsx";
import styles from "../postPage.module.css";
import useAuth from "../../../hooks/useAuth.ts";
import {CommentType, GetApiPaginationGeneric, PostType} from "../../../types/types.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store.ts";
import axios from "axios";

type PropsType = {
    id: number;
    setPost: React.Dispatch<React.SetStateAction<PostType | null>>;
    authorId: number;

}

const Comments: React.FC<PropsType> = (props: PropsType) => {

    const [inputText, setInputText] = useState("");
    const isAuth = useAuth();
    const userId = useSelector((state: RootState) => state.user.user?.id);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

    useEffect(() => {
        axios.get<GetApiPaginationGeneric<CommentType>>(`http://localhost:8000/api/posts/${props.id}/all-comments?size=20&page=1`).then(res => {
            setComments(res.data.items);
        })
    }, [props.id]);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${props.id}`);
        socket.onmessage = (e: MessageEvent<string>) => {
            const comment = JSON.parse(e.data) as CommentType;
            console.log(comment.username);
            setComments((prevComments) => [...prevComments, comment]);
            props.setPost(prevState => {
                if (prevState) {
                    prevState.comments_count += 1
                }
                return prevState;
            })
        };
        setSocket(socket);

        return () => {
            socket.close();
        };
    }, [props]);

    useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            const handleScroll = () => {
                const {scrollTop, scrollHeight, clientHeight} = currentRef;
                setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight);
            };

            currentRef.addEventListener('scroll', handleScroll);
            return () => currentRef.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (isScrolledToBottom && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [comments, isScrolledToBottom]);

    const handleSend = () => {
        if (socket && isAuth && inputText) {
            socket.send(JSON.stringify(inputText));
            setInputText("");
        }
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };


    return (
        <div ref={scrollRef} className={styles.chat_container}>
            {comments.map((comment, index) => (
                <Comment key={index} {...comment} isAuthor={props.authorId === userId}/>
            ))}
            {isAuth ? <div className={styles.send_message}>
                <input
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                    value={inputText}
                    onChange={handleChangeInput}
                    className={styles.send_message__input}
                    type="text"
                    placeholder="Write a comment..."
                />
                <button onClick={handleSend} className={styles.send_message__button}>Send</button>
            </div> : ""}
        </div>
    )
}

export default Comments;