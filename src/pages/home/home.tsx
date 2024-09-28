import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import CreatePost from "./createPost/createPost.tsx";
import styles from "./home.module.css";
import Post from "../../components/post/post.tsx";
import axios from "axios";

interface Post {
    "id": number,
    "topic": string,
    "content": string,
    "created_at": string,
    "user": {
        "id": number,
        "username": string,
        "email": string
    }
}

const Home: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);
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
                            author={{username: post.user.username, id: post.user.id}}
                            tags={["fdsfsdf"]}
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