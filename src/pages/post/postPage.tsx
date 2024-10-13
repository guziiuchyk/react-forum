import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import styles from "./postPage.module.css";
import likeActiveImage from "../../assets/like-active.svg";
import likeImage from "../../assets/like.svg";
import editImage from "../../assets/edit.svg";
import removeImage from "../../assets/remove.svg"
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import NotFound from "../../components/notFound/notFound.tsx";
import useTimeAgo from "../../hooks/useTimeAgo.ts";
import {CommentType, GetApiPaginationPosts, PostType} from "../../types/types.ts";
import Tag from "../../components/post/tag/tag.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import ConfirmationModal from "../../components/confirmationModal/confirmationModal.tsx";
import Comment from "./comment/comment.tsx";
import useAuth from "../../hooks/useAuth.ts";

interface GetOldCommentsType {
    comments: CommentType[];
}

const PostPage: React.FC = () => {
    const {id} = useParams();

    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [inputText, setInputText] = useState("");

    const timeAgo = useTimeAgo(post?.created_at || "");

    const userId = useSelector((state: RootState) => state.user.user?.id);

    const navigate = useNavigate();

    const isAuth = useAuth();

    useEffect(() => {
            const fetchPost = () => {
                axios.get<GetApiPaginationPosts>(`http://localhost:8000/api/posts/${id}`).then((res) => {
                    setPost(res.data.items[0]);
                    setLoading(false);
                }).catch(() => {
                    setLoading(false);
                })
            };
            if (loading) {
                fetchPost();
            }
        },
        [loading, id]);

    useEffect(() => {
        const fetchComments = () => {
            axios.get<GetOldCommentsType>(`http://localhost:8000/api/posts/${id}/all-comments?response_type=json`).then((res) => {
                setComments(res.data.comments)
            })
        }
        fetchComments();
    }, [id]);

    useEffect(() => {
            const socket = new WebSocket(`ws://localhost:8000/ws/1`);
            socket.onmessage = (e: MessageEvent<string>) => {
                console.log(e)
                const comment = JSON.parse(e.data) as CommentType
                setComments(prevComments => [...prevComments, comment]);
            }
            setSocket(socket)
        return () => {
            socket.close();
        }
    }, [id]);
    const deletePost = () => {
        axios.delete(`http://localhost:8000/api/posts/${id}`, {withCredentials: true}).then(() => {
            navigate("/")
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSend = () => {
        if (socket && isAuth && inputText){
            socket.send(JSON.stringify(inputText))
        }
    }

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    return (
        <>
            <Header/>

            {loading ? (
                <div>Loading...</div>
            ) : (
                post ? (
                    <div className={styles.wrapper}>
                        <div className={styles.post}>
                            <div className={styles.nav}>
                                {post.user.id === userId ? <>
                                    <button onClick={() => {
                                        navigate(`/edit-post/${id}`)
                                    }} className={styles.nav__button}>
                                        <img
                                            className={styles.nav__button__img}
                                            src={editImage}
                                            alt="edit"
                                        />
                                    </button>
                                    <button onClick={() => {
                                        setModalOpen(true)
                                    }} className={styles.nav__button}>
                                        <img
                                            className={styles.nav__button__img}
                                            src={removeImage}
                                            alt="delete"
                                        />
                                    </button>
                                </> : null}
                                <button className={styles.nav__button}>
                                    <img
                                        className={styles.nav__button__img}
                                        src={post.is_liked ? likeActiveImage : likeImage}
                                        alt="like"
                                    />
                                </button>
                            </div>
                            <div className={styles.topic}>
                                {post.topic}
                            </div>
                            <div className={styles.description}>
                                {post.content}
                            </div>
                            <div className={styles.tags}>
                                {post.tags.map(tag => <Tag key={tag} tag={tag}/>)}
                            </div>
                            <div className={styles.line}/>
                            <div className={styles.post_footer}>
                                <div className={styles.author}>
                                    <img src={post.user.profile_picture} alt="" className={styles.author__img}/>
                                    <div className={styles.author__info}>
                                        <Link className={styles.author__name} to={`/profile/${post.user.id}`}>
                                            {post.user.username}
                                        </Link>
                                        <div className={styles.author__date}>{timeAgo}</div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.info__field}>{post.likes_count} Likes</div>
                                    <div className={styles.info__field}>200 Comments</div>
                                    <div className={styles.info__field}>200 Views</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <NotFound/>

            )}
            <ConfirmationModal
                text={"Are you sure you want to delete this post?"}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={deletePost}
            />
            {comments ? <div className={styles.chat_container}>
                {comments.map((comment, index) =>
                    <Comment
                        key={index}
                        isAuthor={post?.user.id === userId}
                        id={0}
                        user_id={comment.user_id}
                        user_email={comment.user_email}
                        username={comment.username}
                        profile_picture={comment.profile_picture}
                        content={comment.content}
                        created_at={comment.created_at}
                    />
                )}
                <div className={styles.send_message}>
                    <input value={inputText} onChange={handleChangeInput} className={styles.send_message__input} type="text"/>
                    <button onClick={handleSend} className={styles.send_message__button}>Send</button>
                </div>
            </div> : null}
        </>
    );
};

export default PostPage;
