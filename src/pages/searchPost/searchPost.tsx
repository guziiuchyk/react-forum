import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import styles from "./searchPost.module.css"
import axios from "axios";
import NotFound from "../../components/notFound/notFound.tsx";
import Post from "../../components/post/post.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {GetApiPaginationGeneric, PostType} from "../../types/types.ts";

const SearchPost: React.FC = () => {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [fetching, setFetching] = useState(true);
    const searchText = useSelector((state: RootState) => state.search.value);
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, [searchText]);

    useEffect(() => {
        setPosts([]);
        setCurrentPage(1);
        setFetching(true);
        setIsLoading(true);
    }, [debouncedSearchText]);

    useEffect(() => {
        const fetchPosts = (): void => {
            axios.get<GetApiPaginationGeneric<PostType>>(`http://localhost:8000/api/posts/${debouncedSearchText}?size=5&page=${currentPage}`, {withCredentials: true})
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
    }, [fetching, currentPage, debouncedSearchText]);

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
                {isLoading ? <div>Loading...</div> : posts ? posts.map((post: PostType, index) => <Post
                    key={index}
                    topic={post.topic}
                    author={{username: post.user.username, id: post.user.id, profile_picture:post.user.profile_picture}}
                    tags={post.tags}
                    info={{likes: post.likes_count, comments: post.comments_count}}
                    isLiked={post.is_liked}
                    id={post.id}
                    created_at={post.created_at}
                />) : <NotFound/>}
            </div>
        </>
    )
}

export default SearchPost;