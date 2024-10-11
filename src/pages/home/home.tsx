import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import CreatePost from "./createPost/createPost.tsx";
import styles from "./home.module.css";
import Post from "../../components/post/post.tsx";
import axios from "axios";
import {GetApiPaginationPosts, PostType} from "../../types/types.ts";

const Home: React.FC = () => {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchPosts = (): void => {
            axios.get<GetApiPaginationPosts>(`http://localhost:8000/api/posts?size=5&page=${currentPage}`, {withCredentials: true})
                .then((res) => {
                    if (currentPage === 1) {
                        setPosts(res.data.items);
                    } else {
                        setPosts((prevPosts) => [...prevPosts, ...res.data.items]);
                    }
                    setTotalCount(res.data.total);
                })
                .finally(() => {
                    setIsLoading(false);
                    setFetching(false);
                });
        };

        if (fetching) {
            fetchPosts();
        }
    }, [fetching, currentPage]);

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const target = e.target as Document;
            const scrollPosition = target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight);

            if (scrollPosition < 200 && posts.length < totalCount && !fetching) {
                setFetching(true);
                setCurrentPage((prevPage) => prevPage + 1);
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [posts, totalCount, fetching]);

    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <CreatePost/>
                {isLoading ? (
                    <div className={styles.loading}>Loading...</div>
                ) : (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            topic={post.topic}
                            author={{
                                username: post.user.username,
                                id: post.user.id,
                                profile_picture: post.user.profile_picture,
                            }}
                            tags={post.tags}
                            info={{likes: post.likes_count, views: 10000, comments: 100000}}
                            isLiked={post.is_liked}
                            id={post.id}
                            created_at={post.created_at}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default Home;
