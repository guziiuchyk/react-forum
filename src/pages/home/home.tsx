import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import CreatePost from "./createPost/createPost.tsx";
import styles from "./home.module.css";
import Post from "../../components/post/post.tsx";
import axios from "axios";
import {PostType} from "../../types/types.ts";

const Home: React.FC = () => {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = (): void => {

            axios.get("http://localhost:8000/api/posts").then((res) => {
                setIsLoading(false);
                setPosts(res.data);
            })
        }
        fetchPosts()
    }, []);


    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <CreatePost/>
                {isLoading ? <div className={styles.loading}>Loading...</div> :
                    posts.map((post, index) => (
                        <Post
                            key={index}
                            topic={post.topic}
                            author={{username: post.user.username, id: post.user.id,profile_picture:post.user.profile_picture}}
                            tags={post.tags}
                            info={{likes: 1000, views: 10000, comments: 100000}}
                            isLiked={true}
                            id={post.id}
                            created_at={post.created_at}
                        />
                    ))}
            </div>
        </>
    );
};

export default Home;