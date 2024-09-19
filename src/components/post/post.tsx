import React from "react";
import styles from "./post.module.css";
import {Link} from "react-router-dom";
import likeImage from "../../assets/like.svg"
import likeActiveImage from "../../assets/like-active.svg"
import profileImage from "../../assets/profile.svg"

const Error: React.FC = () => {

    const isActive:boolean = true

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, eos?
            </div>
            <button className={styles.like_wrapper}>
                <div className={styles.like}><img className={styles.like__img} src={isActive ? likeActiveImage : likeImage} alt="like"/></div>
            </button>
            <div className={styles.tags}>
                <Link to={"/tags/finance"} className={styles.tag}>finance</Link>
                <Link to={"/tags/trade"} className={styles.tag}>trade</Link>
                <Link to={"/tags/lorem"} className={styles.tag}>lorem</Link>
            </div>
            <div className={styles.author}>
                <img className={styles.author__img} src={profileImage} alt="author"/>
                <Link to={"/profiles/71759345923"} className={styles.author__name}>Asta1945</Link>
            </div>
            <div className={styles.info}>
                <span className={styles.info__element}>200 Views</span>
                <span className={styles.info__element}>20 Likes</span>
                <span className={styles.info__element}>50 Comments</span>
            </div>
        </div>
    );
};

export default Error;