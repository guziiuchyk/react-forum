import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import styles from "./searchPost.module.css"
import axios from "axios";
import NotFound from "../../components/notFound/notFound.tsx";
import Post from "../../components/post/post.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {GetApiPaginationGeneric, PostType} from "../../types/types.ts";

const SearchPost: React.FC = () => {

    const [posts, setPosts] = useState<PostType[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const searchText = useSelector((state: RootState) => state.search.value);

    useEffect(() => {
        const fetchPosts = () => {
            setIsLoading(true);
            axios.get<GetApiPaginationGeneric<PostType>>(`http://localhost:8000/api/posts/${searchText}`).then((res) => {
                setPosts(res.data.items);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err)
                setIsLoading(false);
            })
        }

        fetchPosts();
    }, [searchText])

    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                {isLoading ? <div>Loading...</div> : posts ? posts.map((post: PostType, index) => <Post
                    key={index}
                    topic={post.topic}
                    author={{username: post.user.username, id: post.user.id, profile_picture:post.user.profile_picture}}
                    tags={["test", "test2", "test3"]}
                    info={{likes: post.likes_count, views: 10000, comments: post.comments_count}}
                    isLiked={post.is_liked}
                    id={post.id}
                    created_at={post.created_at}
                />) : <NotFound/>}
            </div>
        </>
    )
}

export default SearchPost;