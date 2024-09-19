import React from "react";
import styles from "./CreatePost.module.css";
import Header from "../../components/header/header.tsx";

const CreatePost:React.FC = () => {
    return (
        <>
            <Header/>
            <div className={styles.content}>
                <div className={styles.title}>Create Post</div>
                <div className={styles.label}>Topic:</div>
                <textarea className={styles.textarea}/>
                <div className={styles.label}>Description:</div>
                <textarea className={`${styles.textarea} ${styles.description}`}/>
                <div className={styles.label}>Tags:</div>
                <input className={styles.tags}></input>
                <div className={styles.button_wrapper}>
                    <button className={styles.button}>Create</button>
                </div>
            </div>
        </>
    );
};

export default CreatePost;