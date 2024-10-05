import React, {useEffect, useState} from 'react';
import Header from "../../components/header/header.tsx";
import styles from "./myProfile.module.css";
import profileImage from "../../assets/profile.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import useAuth from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import Post from "../../components/post/post.tsx";
import axios from "axios";
import {UserPostType, UserType} from "../../types/types.ts";

const MyProfile: React.FC = () => {

    const isAuthenticated = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<UserPostType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    if (!isAuthenticated) {
        navigate("/login");
    }

    const user = useSelector((state: RootState) => state.user.user as UserType | null);

    useEffect(() => {
        const fetchPosts = () => {
            if (user) {
                axios.get(`http://localhost:8000/api/my-profile`, {withCredentials:true}).then((res) => {
                    setPosts(res.data.posts);
                    setIsLoading(false);
                }).catch((err) => {
                    console.log(err)
                    setIsLoading(false);
                })
            }
        }
        if (isLoading) {
            fetchPosts()
        }
    })

    return (
        <>
            <Header/>
            {user ? <div className={styles.content}>
                <div className={styles.profile_wrapper}>
                    <img width={200} height={200} src={profileImage} alt="MyProfile" className={styles.profile__img}/>
                    <div className={styles.profile_info}>
                        <div className={styles.profile__name}>{user.username}</div>
                        <div className={styles.profile__desc}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at et molestias quaerat
                            unde vitae.
                        </div>
                    </div>
                </div>

                {isLoading ? <div>Loading...</div> : <div className={styles.posts_wrapper}>
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            topic={post.topic}
                            author={{username: user.username, id: post.user_id}}
                            tags={post.tags}
                            info={{likes: 1000, views: 10000, comments: 100000}}
                            isLiked={true}
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
