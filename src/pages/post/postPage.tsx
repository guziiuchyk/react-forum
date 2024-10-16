import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/header.tsx";
import styles from "./postPage.module.css";
import likeActiveImage from "../../assets/like-active.svg";
import likeImage from "../../assets/like.svg";
import editImage from "../../assets/edit.svg";
import removeImage from "../../assets/remove.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../../components/notFound/notFound.tsx";
import useTimeAgo from "../../hooks/useTimeAgo.ts";
import {CommentType, GetApiPaginationGeneric, PostType} from "../../types/types.ts";
import Tag from "../../components/post/tag/tag.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import ConfirmationModal from "../../components/confirmationModal/confirmationModal.tsx";
import Comment from "./comment/comment.tsx";
import useAuth from "../../hooks/useAuth.ts";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import 'prismjs/themes/prism-tomorrow.css';

const PostPage: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [inputText, setInputText] = useState("");
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

    const timeAgo = useTimeAgo(post?.created_at || "");
    const userId = useSelector((state: RootState) => state.user.user?.id);
    const navigate = useNavigate();
    const isAuth = useAuth();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading) {
            axios.get<GetApiPaginationGeneric<PostType>>(`http://localhost:8000/api/posts/${id}`, {withCredentials: true}).then(res => {
                setPost(res.data.items[0]);
            }).finally(() => setLoading(false));
        }
    }, [loading, id]);
    useEffect(() => {
        axios.get<GetApiPaginationGeneric<CommentType>>(`http://localhost:8000/api/api/posts/${id}/all-comments?size=20&page=1`).then(res => {
            setComments(res.data.items);
        })
    }, [id]);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${id}`);
        socket.onmessage = (e: MessageEvent<string>) => {
            const comment = JSON.parse(e.data) as CommentType;
            console.log(comment.username);
            setComments((prevComments) => [...prevComments, comment]);
            setPost(prevState => {
                if(prevState){
                    prevState.comments_count += 1
                }
                return prevState;
            })
        };
        setSocket(socket);

        return () => {
            socket.close();
        };
    }, [id]);

    useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            const handleScroll = () => {
                const { scrollTop, scrollHeight, clientHeight } = currentRef;
                setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight);
            };

            currentRef.addEventListener('scroll', handleScroll);
            return () => currentRef.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (isScrolledToBottom && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [comments, isScrolledToBottom]);

    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/posts/${id}`, { withCredentials: true });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const handleSend = () => {
        if (socket && isAuth && inputText) {
            socket.send(JSON.stringify(inputText));
            setInputText("");
        }
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleLikeButton = () => {
        if(!isAuth) return;
        if(post?.is_liked){
            axios.delete(`http://localhost:8000/api/posts/${id}/like/`, {withCredentials:true}).then(()=> {
                setPost(prevState => {
                    if (prevState) {
                        return {
                            ...prevState,
                            likes_count: prevState.likes_count - 1,
                            is_liked: false,
                        };
                    }
                    return prevState;
                });

            })
        } else {
            axios.post(`http://localhost:8000/api/posts/${id}/like/`, {}, {withCredentials:true}).then(()=> {
                setPost(prevState => {
                    if (prevState) {
                        return {
                            ...prevState,
                            likes_count: prevState.likes_count + 1,
                            is_liked: true,
                        };
                    }
                    return prevState;
                });

            })
        }
    }

    return (
        <>
            <Header />

            {loading ? (
                <div>Loading...</div>
            ) : (
                post ? (
                    <div className={styles.wrapper}>
                        <div className={styles.post}>
                            <div className={styles.nav}>
                                {post.user.id === userId && (
                                    <>
                                        <button onClick={() => navigate(`/edit-post/${id}`)} className={styles.nav__button}>
                                            <img className={styles.nav__button__img} src={editImage} alt="edit" />
                                        </button>
                                        <button onClick={() => setModalOpen(true)} className={styles.nav__button}>
                                            <img className={styles.nav__button__img} src={removeImage} alt="delete" />
                                        </button>
                                    </>
                                )}
                                <button onClick={handleLikeButton} className={styles.nav__button}>
                                    <img className={styles.nav__button__img} src={post.is_liked ? likeActiveImage : likeImage} alt="like" />
                                </button>
                            </div>
                            <div className={styles.topic}>{post.topic}</div>
                            <div className={styles.description}>
                                <ReactMarkdown remarkPlugins={[remarkBreaks]}>{post.content}</ReactMarkdown>
                            </div>
                            <div className={styles.tags}>
                                {post.tags.map((tag) => <Tag key={tag} tag={tag} />)}
                            </div>
                            <div className={styles.line} />
                            <div className={styles.post_footer}>
                                <div className={styles.author}>
                                    <img src={post.user.profile_picture} alt="" className={styles.author__img} />
                                    <div className={styles.author__info}>
                                        <Link className={styles.author__name} to={`/profile/${post.user.id}`}>
                                            {post.user.username}
                                        </Link>
                                        <div className={styles.author__date}>{timeAgo}</div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.info__field}>{post.likes_count} Likes</div>
                                    <div className={styles.info__field}>{comments.length} Comments</div>
                                    <div className={styles.info__field}>200 Views</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <NotFound />
            )}

            <ConfirmationModal
                text="Are you sure you want to delete this post?"
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={deletePost}
            />

            {post ? (
                <div ref={scrollRef} className={styles.chat_container}>
                    {comments.map((comment, index) => (
                        <Comment key={index} {...comment} isAuthor={post?.user.id === userId} />
                    ))}
                    {isAuth ? <div className={styles.send_message}>
                        <input
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                    handleSend();
                                }
                            }}
                            value={inputText}
                            onChange={handleChangeInput}
                            className={styles.send_message__input}
                            type="text"
                            placeholder="Write a comment..."
                        />
                        <button onClick={handleSend} className={styles.send_message__button}>Send</button>
                    </div> : ""}
                </div>
            ) : null}
        </>
    );
};

export default PostPage;
