import React from "react";
import Header from "../../components/header/header.tsx";
import CreatePost from "./createPost/createPost.tsx";
import styles from "./home.module.css";
import Post from "../../components/post/post.tsx";

const Home:React.FC = () => {
    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <CreatePost/>
                <Post/>
            </div>
        </>
    );
};

export default Home;