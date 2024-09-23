import React from "react";
import Header from "../../components/header/header.tsx";
import CreatePost from "./createPost/createPost.tsx";
import styles from "./home.module.css";
import Post from "../../components/post/post.tsx";

const Home:React.FC = () => {

    const posts = [
        {
            topic: "Lorem ipsum dolor sit amet",
            author: { name: "John Doe", date: "23.09.2024", id: 321312312 },
            tags: ["finance", "crypto", "bitcoin"],
            info: { likes: 2000, comments: 100, views: 100000 },
            isLiked: true
        },
        {
            topic: "gfdgdfgd fd gfdgdf gdfgdf gdfgd",
            author: { name: "Jane Smith", date: "21.09.2024", id: 432432 },
            tags: ["blockchain", "investment", "technology"],
            info: { likes: 2312, comments: 43, views: 3123 },
            isLiked: false
        },
        {
            topic: "Excepteur sint occaecat cupidatat",
            author: { name: "Alice Brown", date: "15.09.2024", id: 987654321 },
            tags: ["stocks", "trading", "market"],
            info: { likes: 3000, comments: 200, views: 120000 },
            isLiked: true
        }
    ];

    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <CreatePost/>
                {posts.map((post, index) => (
                    <Post
                        key={index}
                        topic={post.topic}
                        author={post.author}
                        tags={post.tags}
                        info={post.info}
                        isLiked={post.isLiked}
                    />
                ))}
            </div>
        </>
    );
};

export default Home;