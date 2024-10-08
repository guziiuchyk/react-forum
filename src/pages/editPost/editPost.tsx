import React, {useEffect, useState} from "react";
import Header from "../../components/header/header.tsx";
import styles from "./editPost.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {PostType} from "../../types/types.ts";
import axios, {AxiosError} from "axios";
import NotFound from "../../components/notFound/notFound.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

type editedPostType = {
    topic?: string,
    content?: string,
    tags?: string[],
}

const EditPost: React.FC = () => {

    const navigate = useNavigate();

    const {id} = useParams();
    const user = useSelector((state: RootState) => state.user.user);

    const [post, setPost] = useState<PostType | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("");

    const handleTopic = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setTopic(e.target.value);
    }

    const handleContent = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setContent(e.target.value);
    }

    const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value);
    }

    const patchPost = () => {
        const editedPost:editedPostType = {
            topic:"",
            content:"",
            tags:[]
        }

        if(topic !== post?.topic){
            editedPost.topic = topic;
        }
        if(content !== post?.content){
            editedPost.content = content;
        }
        if(JSON.stringify(tags.split(" ")) !== JSON.stringify(post?.tags)){
            editedPost.tags = tags.split(" ");
        }
        if (editedPost.tags?.length === 0 && editedPost.content === "" && editedPost.topic === ""){
            setError("You didn't change anything");
            return;
        }
        axios.patch(`http://localhost:8000/api/posts/${id}`,{...editedPost},{withCredentials:true}).then(() => {
            navigate(`/posts/${id}`)
        })
    }

    const fetchPost = () => {
        axios.get<PostType>(`http://localhost:8000/api/posts/${id}`).then((res) => {
            setIsLoading(false);
            if(user?.id !== res.data.user.id){
                navigate("/login")
                return;
            }
            setPost(res.data);
            setTopic(res.data.topic);
            setContent(res.data.content);
            setTags(res.data.tags.join(" "))
        }).catch((err: AxiosError) => {
            console.log(err.status)
            setIsLoading(false);
        })
    }

    useEffect(() => {
        console.log(1243)
        if (isLoading) {
            fetchPost()
        }
    })

    return (
        <>
            <Header/>
            {isLoading ? <div>Loading...</div> : post ? <div className={styles.content}>
                <div className={styles.title}>Edit Post</div>
                {error ? <div className={styles.error}>{error}</div> : ""}
                <div className={styles.label}>Topic:</div>
                <textarea value={topic} onChange={handleTopic} className={styles.textarea}/>
                <div className={styles.label}>Description:</div>
                <textarea value={content} onChange={handleContent}
                          className={`${styles.textarea} ${styles.description}`}/>
                <div className={styles.label}>Tags:</div>
                <input value={tags} onChange={handleTags} className={styles.tags}></input>
                <div className={styles.buttons}>
                    <button onClick={()=>{navigate(-1)}} className={styles.button}>Back</button>
                    <button onClick={patchPost} className={styles.button}>Confirm</button>
                </div>
            </div> : <NotFound/>}
        </>
    )
}

export default EditPost;