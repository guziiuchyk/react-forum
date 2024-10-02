import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import styles from "./postPage.module.css";
import profileImage from "../../assets/profile.svg";
import likeActiveImage from "../../assets/like-active.svg";
import likeImage from "../../assets/like.svg";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import NotFound from "../../components/notFound/notFound.tsx";
import useTimeAgo from "../../hooks/useTimeAgo.ts";
import {PostType} from "../../types/types.ts";

const PostPage: React.FC = () => {
    const isLiked = false;
    const {id} = useParams();

    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);

    const timeAgo = useTimeAgo(post?.created_at || "");

    useEffect(() => {
        const fetchPost = async (): Promise<void> => {
            try {
                const res = await axios.get(`http://localhost:8000/api/posts/${id}`);
                setPost(res.data);
                setLoading(false);
            } catch {
                setLoading(false);
            }
        };
        if (loading) {
            fetchPost();
        }
    }, [loading, id]);

    return (
        <>
            <Header/>

            {loading ? (
                <div>Loading...</div>
            ) : (
                post ? (
                    <div className={styles.wrapper}>
                        <div className={styles.post}>
                            <div className={styles.like}>
                                <img
                                    className={styles.like__img}
                                    src={isLiked ? likeActiveImage : likeImage}
                                    alt="like"
                                />
                            </div>
                            <div className={styles.topic}>
                                {post.topic}
                            </div>
                            <div className={styles.description}>
                                {post.content}
                            </div>
                            <div className={styles.line}/>
                            <div className={styles.post_footer}>
                                <div className={styles.author}>
                                    <img src={profileImage} alt="" className={styles.author__img}/>
                                    <div className={styles.author__info}>
                                        <Link className={styles.author__name} to={`/profiles/${post.user.id}`}>
                                            {post.user.username}
                                        </Link>
                                        <div className={styles.author__date}>{timeAgo}</div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.info__field}>200 Likes</div>
                                    <div className={styles.info__field}>200 Comments</div>
                                    <div className={styles.info__field}>200 Views</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <NotFound/>
            )}
        </>
    );
};

export default PostPage;
