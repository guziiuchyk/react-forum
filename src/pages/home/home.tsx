import React from "react";
import Header from "../../components/header/header.tsx";
import CreatePost from "./createPost/createPost.tsx";
import styles from "./home.module.css";
import PostsPagination from "../../components/postsPagination/postsPagination.tsx";

const Home: React.FC = () => {

    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <CreatePost/>
                <PostsPagination link={"http://localhost:8000/api/posts"}/>
            </div>
        </>
    );
};

export default Home;
