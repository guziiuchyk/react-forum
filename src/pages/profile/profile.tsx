import styles from "./profile.module.css";
import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import profileImage from "../../assets/profile.svg";
import Post from "../../components/post/post.tsx";
import {UserType} from "../../types/types.ts";
import axios, {AxiosError} from "axios";
import {useNavigate, useParams} from "react-router-dom";
import NotFound from "../../components/notFound/notFound.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

const Profile: React.FC = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);

    const {id} = useParams();

    const userId = useSelector((state: RootState) => state.user.user?.id);

    const fetchUser = () => {
        axios.get<UserType>(`http://localhost:8000/api/users/${id}`).then((res) => {
            setUser(res.data);
            setIsLoading(false);
        }).catch((err: AxiosError) => {
            console.log(err)
            setIsLoading(false);
        })
    }

    useEffect(() => {
        if(Number(id) === userId){
            navigate("/profile")
        }
        if (isLoading) {
            fetchUser();
        }
    })

    return (
        <>
            <Header/>
            {isLoading ? <div>Loading...</div> : user ?
                <>
                    <div className={styles.profile_wrapper}>
                        <img width={200} height={200} src={profileImage} alt="profile"
                             className={styles.profile__img}/>
                        <div className={styles.profile_info}>
                            <div className={styles.profile__name}>{user.username}</div>
                            <div className={styles.profile__desc}>{user.bio}</div>
                        </div>
                        <div className={styles.profile__nav}>
                            <button className={styles.button}>Send Message</button>
                        </div>
                    </div>
                    <div className={styles.posts_wrapper}>
                        {user.posts.map((post, index) => (
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
                    </div>
                </>
                : <NotFound/>}
        </>
    )
}

export default Profile;