import React, {useEffect, useState} from "react";
import styles from "./CreatePost.module.css";
import Header from "../../components/header/header.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import axios from "axios";

const CreatePost: React.FC = () => {
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState("");
    const [onDrag, setOnDrag] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
        if (location.state && location.state.topic) {
            setTopic(location.state.topic);
        }
    }, [isAuthenticated, location.state, navigate]);

    const handleTopic = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTopic(e.target.value);
    };

    const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setContent(e.target.value);
    };

    const handleTags = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTags(e.target.value);
    };

    const handleCreate = (): void => {
        const formData = new FormData();

        if (topic.length < 3 || topic.length > 200) {
            setError("Topic must be between 3 and 200 characters.");
            return;
        }

        if (content.length < 10 || content.length > 800) {
            setError("Content must be between 10 and 800 characters.");
            return;
        }

        if(files.length > 0){
            files.forEach((file) => {
                formData.append('files', file);
            });
        }
        else {
            formData.append('files', "");
        }
        const queryParams = `?topic=${encodeURIComponent(topic)}&content=${encodeURIComponent(content)}${tags ? `&tags=${encodeURIComponent(tags.split(" ").join(", "))}` : ""}`;

        axios.post(`http://localhost:8000/api/posts${queryParams}`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((res) => {
                navigate(`/posts/${res.data.id}`);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };


    const handleDragStart = (e: React.DragEvent<HTMLTextAreaElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setOnDrag(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLTextAreaElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setOnDrag(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setOnDrag(false);
        const newFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prevPreviews) => [...prevPreviews, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    return (
        <>
            <Header/>
            <div className={styles.content}>
                {error ? <div className={styles.error}>{error}</div> : null}
                <div className={styles.title}>Create Post</div>
                <div className={styles.label}>Topic:</div>
                <textarea value={topic} onChange={handleTopic} className={styles.textarea}/>

                <div className={styles.label}>Images:</div>
                <div
                    className={styles.files_wrapper}
                    onDragStart={handleDragStart}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragStart}
                >
                    <div className={styles.files}>
                        {imagePreviews.length === 0 ? (
                            <div className={styles.empty}>Empty</div>
                        ) : (
                            imagePreviews.map((src, index) => (
                                <div className={styles.image_wrapper}>
                                    <img key={index} src={src} alt={`file-preview-${index}`}
                                         className={styles.image_preview}/>
                                    <span onClick={()=> {handleRemoveImage(index)}} className={styles.image_cancel}>X</span>
                                </div>
                            ))
                        )}
                    </div>
                    <div
                        style={onDrag ? {} : {display: "none"}}
                        className={styles.textarea__absolute_block}
                        onDragStart={handleDragStart}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragStart}
                        onDrop={handleDrop}
                    >
                        Drop files for uploading
                    </div>
                </div>

                <div className={`${styles.label} ${styles.decr_label}`}>Description:</div>
                <textarea
                    value={content}
                    onChange={handleContent}
                    className={`${styles.textarea} ${styles.description}`}
                />

                <div className={styles.label}>Tags:</div>
                <input value={tags} onChange={handleTags} className={styles.tags}></input>

                <div className={styles.button_wrapper}>
                    <button onClick={handleCreate} className={styles.button}>Create</button>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
