import React from "react";
import Header from "../../components/header/header.tsx";
import styles from "./postPage.module.css";

const PostPage: React.FC = () => {
    return(
        <>
            <Header/>
            <div className={styles.wrapper}>
                <div className={styles.post}>
                    <div className={styles.topic}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, iste.
                    </div>
                    <div className={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad, doloribus eligendi iusto laboriosam laudantium libero officiis ullam. Alias aperiam at aut blanditiis consequatur deserunt dicta, dolor eum fuga fugiat, hic labore mollitia nam natus officiis optio quas quos reprehenderit sit soluta! Ab commodi, corporis deleniti fuga incidunt quaerat tempora voluptatem! Ad adipisci blanditiis cumque deserunt dolorem ducimus est et illo officia, quia recusandae, repellat, suscipit voluptas! Architecto asperiores autem beatae dicta ea facere id laudantium non officia, placeat quam quo quos, soluta suscipit tempora temporibus tenetur, ut voluptatem? At beatae, deleniti eum harum odio saepe sint sunt suscipit voluptate.
                    </div>
                    <div className={styles.line}/>
                    <div className={styles.post_footer}>
                        <div className={styles.author}>
                            <img src="" alt="" className={styles.author__img}/>
                            <div className={styles.author__info}>
                                <div className={styles.author__name}>Asta1945</div>
                                <div className={styles.author__date}>21.10.2024</div>
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
        </>
    )
}

export default PostPage;