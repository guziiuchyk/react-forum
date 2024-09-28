import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import styles from "./postPage.module.css";
import profileImage from "../../assets/profile.svg";
import likeActiveImage from "../../assets/like-active.svg";
import likeImage from "../../assets/like.svg";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

interface Post {
    id: number;
    topic: string;
    content: string;
    created_at: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

const PostPage: React.FC = () => {

    const isLiked = false;
    const {id} = useParams();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = (): void => {
            axios.get(`http://localhost:8000/api/posts/${id}`).then((res) => {
                setPost(res.data);
                setLoading(false);
            }).catch((error) => {
                console.error("Failed to fetch post:", error);
                setLoading(false);
            });
        };
        if (loading) {
            fetchPost();
        }
    }, [loading, id]);

    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    post && (
                        <div className={styles.post}>
                            <div className={styles.like}>
                                <img
                                    className={styles.like__img}
                                    src={isLiked ? likeActiveImage : likeImage}
                                    alt="like"
                                />
                            </div>
                            <div className={styles.topic}>
                                {post?.topic}
                            </div>
                            <div className={styles.description}>
                                {post?.content}
                            </div>
                            <div className={styles.line}/>
                            <div className={styles.post_footer}>
                                <div className={styles.author}>
                                    <img src={profileImage} alt="" className={styles.author__img}/>
                                    <div className={styles.author__info}>
                                        <Link className={styles.author__name} to={`/profiles/${post?.user.id}`}>
                                            {post?.user?.username}
                                        </Link>
                                        <div className={styles.author__date}>{post?.created_at}</div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.info__field}>200 Likes</div>
                                    <div className={styles.info__field}>200 Comments</div>
                                    <div className={styles.info__field}>200 Views</div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default PostPage;
