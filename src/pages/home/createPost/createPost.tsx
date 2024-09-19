import React from "react";
import styles from "./createPost.module.css"
import {Link} from "react-router-dom";
import profileImage from "../../../assets/profile.svg"

const Home: React.FC = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <img className={styles.img} src={profileImage} alt=""/>
                <input placeholder="Let’s share what going on your mind..." className={styles.text}/>
                <Link to={"/create-post"} className={styles.button}>Create Post</Link>
            </div>
        </>
    );
};

export default Home;