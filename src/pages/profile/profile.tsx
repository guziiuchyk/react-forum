import React from 'react';
import Header from "../../components/header/header.tsx";
import styles from "./profile.module.css";
import profileImage from "../../assets/profile.svg";

const Profile: React.FC = () => {

    return (
        <>
            <Header />
            <div className={styles.content}>
                <div className={styles.profile_wrapper}>
                    <img width={200} height={200} src={profileImage} alt="Profile" className={styles.profile__img} />
                    <div className={styles.profile_info}>
                        <div className={styles.profile__name}>Asta1945</div>
                        <div className={styles.profile__desc}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at et molestias quaerat unde vitae.
                        </div>
                    </div>
                </div>

                {/*<div className={styles.posts_wrapper}>
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            topic={post.topic}
                            author={post.author}
                            tags={post.tags}
                            info={post.info}
                            isLiked={post.isLiked}
                        />
                    ))}
                </div>*/}
            </div>
        </>
    );
};

export default Profile;
