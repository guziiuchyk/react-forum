import React, {useState} from "react";
import styles from "./CreatePost.module.css";
import Header from "../../components/header/header.tsx";

const CreatePost: React.FC = () => {

    const [topic, setTopic] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");

    return (
        <>
            <Header />
            <div className={styles.content}>
                <div className={styles.title}>Create Post</div>
                <div className={styles.label}>Topic:</div>
                <textarea value={topic} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setTopic(e.target.value)
                }} className={styles.textarea}/>
                <div className={styles.label}>Description:</div>
                <textarea value={desc} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setDesc(e.target.value)
                }} className={`${styles.textarea} ${styles.description}`}/>
                <div className={styles.label}>Tags:</div>
                <input value={tags} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTags(e.target.value)
                }} className={styles.tags}></input>
                <div className={styles.button_wrapper}>
                    <button className={styles.button}>Create</button>
                </div>
            </div>
        </>
    );
};

export default CreatePost;