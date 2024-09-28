import React from "react";
import styles from "./post.module.css";
import {Link} from "react-router-dom";
import likeImage from "../../assets/like.svg"
import likeActiveImage from "../../assets/like-active.svg"
import profileImage from "../../assets/profile.svg"

interface PostProps {
    "id": number,
    "topic": string,
    "created_at": string,
    tags: string[],
    isLiked: boolean,
    info: { views: number, comments: number, likes: number },
    author:{
        username: string,
        id: number
    }
}

type TagProps = {
    tag: string;
};


const Tag: React.FC<TagProps> = ({ tag }) => {
    return (
        <Link to={`/tags/${tag}`} className={styles.tag}>
            {tag}
        </Link>
    );
};
const Post: React.FC<PostProps> = (props) => {

    const {topic, tags, info, isLiked, id, created_at, author} = props;

    return (
        <div className={styles.wrapper}>
            <Link to={`/posts/${id}`} className={styles.title}>{topic}
            </Link>
            <button className={styles.like_wrapper}>
                <div className={styles.like}><img className={styles.like__img}
                                                  src={isLiked ? likeActiveImage : likeImage} alt="like"/></div>
            </button>
            <div className={styles.tags}>
                {tags?.map(tag => (<Tag key={tag} tag={tag}/>))}
            </div>
            <div className={styles.author}>
                <img className={styles.author__img} src={profileImage} alt="author"/>
                <div className={styles.author_info}>
                    <Link to={`/profiles/${author.id}`} className={styles.author__name}>{author.username}</Link>
                    <span className={styles.info__date}>{created_at}</span>
                </div>
            </div>
            <div className={styles.info}>
                <span className={styles.info__element}>{info.views}</span>
                <span className={styles.info__element}>{info.likes}</span>
                <span className={styles.info__element}>{info.comments}</span>
            </div>
        </div>
    );
};

export default Post;