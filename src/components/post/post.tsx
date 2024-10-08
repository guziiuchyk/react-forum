import React, {useRef, useState} from "react";
import styles from "./post.module.css";
import {Link, useNavigate} from "react-router-dom";
import likeImage from "../../assets/like.svg"
import likeActiveImage from "../../assets/like-active.svg"

import removeImage from "../../assets/remove.svg"
import editImage from "../../assets/edit.svg"
import useTimeAgo from "../../hooks/useTimeAgo.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import axios from "axios";
import Tag from "./tag/tag.tsx";
import ConfirmationModal from "../confirmationModal/confirmationModal.tsx";

interface PostProps {
    "id": number,
    "topic": string,
    "created_at": string,
    tags: string[],
    isLiked: boolean,
    info: { views: number, comments: number, likes: number },
    author: {
        username: string,
        id: number,
        profile_picture: string
    }
}

const Post: React.FC<PostProps> = (props) => {

    const {topic, tags, info, isLiked, id, created_at, author} = props;

    const navigate = useNavigate();

    const formatedDate = useTimeAgo(created_at);
    const user = useSelector((state: RootState) => state.user.user);
    const isAuthor = author?.id === user?.id;
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [isModalOpen, setModalOpen] = useState(false);

    const deletePost = (id:number) => {
        axios.delete(`http://localhost:8000/api/posts/${id}`, {withCredentials:true}).then(()=> {
            if(wrapperRef.current) {
                wrapperRef.current.remove();
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <Link to={`/posts/${id}`} className={styles.title}>{topic}</Link>
            <div className={styles.buttons_wrapper}>
                {isAuthor ? <>
                    <button onClick={()=>{navigate(`/edit-post/${id}`)}}>
                        <div className={styles.button}>
                            <img className={styles.button__img} src={editImage} alt="like"/>
                        </div>
                    </button>
                    <button onClick={()=>{setModalOpen(true)}}>
                        <div className={styles.button}>
                            <img className={styles.button__img} src={removeImage} alt="like"/>
                        </div>
                    </button>
                </> : ""}
                <button>
                    <div className={styles.button}><img className={styles.button__img}
                                                        src={isLiked ? likeActiveImage : likeImage} alt="like"/></div>
                </button>
            </div>
            <div className={styles.tags}>
                {tags?.map(tag => (<Tag key={tag} tag={tag}/>))}
            </div>
            <div className={styles.author}>
                <img className={styles.author__img} src={author.profile_picture} alt="author"/>
                <div className={styles.author_info}>
                    <Link to={isAuthor ? "/profile" : `/profile/${author.id}`} className={styles.author__name}>{author.username}</Link>
                    <span className={styles.info__date}>{formatedDate}</span>
                </div>
            </div>
            <div className={styles.info}>
                <span className={styles.info__element}>{info.views}</span>
                <span className={styles.info__element}>{info.likes}</span>
                <span className={styles.info__element}>{info.comments}</span>
            </div>
            <ConfirmationModal
                text={"Are you sure you want to delete this post?"}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={()=>{deletePost(id)}}
            />
        </div>
    );
};

export default Post;