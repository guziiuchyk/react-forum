import React, {useEffect, useState} from 'react';
import Header from "../../components/header/header.tsx";
import styles from "./myProfile.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import useAuth from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import Post from "../../components/post/post.tsx";
import axios from "axios";
import {GetApiPaginationGeneric, PostType, UserType} from "../../types/types.ts";

const MyProfile: React.FC = () => {

    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    
    const user = useSelector((state: RootState) => state.user.user as UserType | null);

    useEffect(() => {
        if(isAuthenticated === false){
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const fetchPosts = (): void => {
            axios.get<GetApiPaginationGeneric<PostType>>(`http://localhost:8000/api/users/${user?.id}/posts/?size=5&page=${currentPage}`, {withCredentials: true})
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

        if (fetching && user) {
            fetchPosts();
        }
    }, [fetching, currentPage, user]);

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
            {user ? <div className={styles.content}>
                <div className={styles.profile_wrapper}>
                    <img width={200} height={200} src={user.profile_picture} alt="MyProfile"
                         className={styles.profile__img}/>
                    <div className={styles.profile_info}>
                        <div className={styles.profile__name}>{user.username}</div>
                        <div className={styles.profile__desc}>{user.bio}</div>
                    </div>
                </div>

                {isLoading ? <div>Loading...</div> : <div className={styles.posts_wrapper}>
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            topic={post.topic}
                            author={{username: user.username, id: post.user.id, profile_picture: user.profile_picture}}
                            tags={post.tags}
                            info={{likes: post.likes_count, comments: post.comments_count}}
                            isLiked={post.is_liked}
                            id={post.id}
                            created_at={post.created_at}
                        />
                    ))}
                </div>}
            </div> : <div>Loading...</div>}
        </>
    );
};

export default MyProfile;
