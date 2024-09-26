import React from 'react';
import Header from "../../components/header/header.tsx";
import styles from "./profile.module.css";
import Post from "../../components/post/post.tsx";
import profileImage from "../../assets/profile.svg";

const Profile: React.FC = () => {

    const posts = [
        {
            topic: "Lorem ipsum dolor sit amet",
            author: { name: "John Doe", date: "23.09.2024", id: "321312312" },
            tags: ["finance", "crypto", "bitcoin"],
            info: { likes: 2000, comments: 100, views: 100000 },
            isLiked: true,
            id: "123456789"
        },
        {
            topic: "Duis aute irure dolor",
            author: { name: "Jane Smith", date: "20.09.2024", id: "123456789" },
            tags: ["blockchain", "investment", "technology"],
            info: { likes: 1500, comments: 80, views: 85000 },
            isLiked: false
        },
        {
            topic: "Excepteur sint occaecat cupidatat",
            author: { name: "Alice Brown", date: "15.09.2024", id: "987654321" },
            tags: ["stocks", "trading", "market"],
            info: { likes: 3000, comments: 200, views: 120000 },
            isLiked: true
        }
    ];

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

                <div className={styles.posts_wrapper}>
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
                </div>
            </div>
        </>
    );
};

export default Profile;
