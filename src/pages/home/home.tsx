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
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchPosts = (): void => {
            axios.get(`http://localhost:8000/api/posts?page_size=5&page=${currentPage}`).then((res) => {
                setPosts((prevPosts) => [...prevPosts, ...res.data]);
                setCurrentPage(prevState => prevState + 1);
                setIsLoading(false);
            }).finally(() => setFetching(false));
        }
        if(fetching){
            fetchPosts()
        }
    }, [currentPage, fetching]);

    /*
    useEffect(() => {
        const fetchPosts = (): void => {

            axios.get("http://localhost:8000/api/posts?page_size=5").then((res) => {
                setIsLoading(false);
                setPosts(res.data);
            })
        }
        fetchPosts()
    }, []); */

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleScroll = (e:Event) => {
        const target = e.target as Document;
        if(target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 200){
            console.log("scroll");
            setFetching(true);
        }
    }

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