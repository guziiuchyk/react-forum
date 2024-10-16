import React, {useEffect, useState} from "react";
import styles from "./CreatePost.module.css";
import Header from "../../components/header/header.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import axios from "axios";

const CreatePost: React.FC = () => {
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const isAuthenticated = useAuth();
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
        if (location.state && location.state.topic) {
            setTopic(location.state.topic);
        }
    }, [isAuthenticated, location.state, navigate]);

    const handleTopic = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTopic(e.target.value);
    }

    const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setContent(e.target.value);
    }

    const handleTags = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTags(e.target.value);
    }

    const handleCreate = (): void => {
        axios.post(`http://localhost:8000/api/posts?topic=${encodeURIComponent(topic)}&content=${encodeURIComponent(content)}&tags=${tags.split(" ").join(", ") ||" "}`, {}, {withCredentials: true}).then((res) => {
            navigate(`/posts/${res.data.id}`);
        }).catch((err) => {
            console.log(err.response)
        })
    }

    return (
        <>
            <Header/>
            <div className={styles.content}>
                <div className={styles.title}>Create Post</div>
                <div className={styles.label}>Topic:</div>
                <textarea value={topic} onChange={handleTopic} className={styles.textarea}/>
                <div className={styles.label}>Description:</div>
                <textarea value={content} onChange={handleContent}
                          className={`${styles.textarea} ${styles.description}`}/>
                <div className={styles.label}>Tags:</div>
                <input value={tags} onChange={handleTags} className={styles.tags}></input>
                <div className={styles.button_wrapper}>
                    <button onClick={handleCreate} className={styles.button}>Create</button>
                </div>
            </div>
        </>
    );
};

export default CreatePost;