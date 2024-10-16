import styles from "./profile.module.css";
import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import Post from "../../components/post/post.tsx";
import {PostType, UserType} from "../../types/types.ts";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import NotFound from "../../components/notFound/notFound.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

const Profile: React.FC = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);
    const [posts, setPosts] = useState<PostType[]>([]);

    const {id} = useParams();

    const userId = useSelector((state: RootState) => state.user.user?.id);

    const fetchUser = () => {

        const userPromise = axios.get<UserType>(`http://localhost:8000/api/users/${id}`)
        const postsPromise = axios.get<PostType[]>(`http://localhost:8000/api/users/${id}/posts/`)

        Promise.allSettled([userPromise, postsPromise]).then((result) => {
            if(result[0].status === "fulfilled"){
                setUser(result[0].value.data);
            } else {
                setIsLoading(false);
                return
            }
            if(result[1].status === "fulfilled"){
                setPosts(result[1].value.data)
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        if (Number(id) === userId) {
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
                        <img width={200} height={200} src={user.profile_picture} alt="profile"
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
                        {posts.map((post, index) => (
                            <Post
                                key={index}
                                topic={post.topic}
                                author={{username: user.username, id: post.user.id,profile_picture:user.profile_picture}}
                                tags={post.tags}
                                info={{likes: post.likes_count, views: 10000, comments: post.comments_count}}
                                isLiked={post.is_liked}
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