import React, {useState} from "react";
import styles from "./createPost.module.css"
import {useNavigate} from "react-router-dom";
import profileImage from "../../../assets/profile.svg"

const Home: React.FC = () => {

    const [text, setText] = useState("");

    const navigate = useNavigate();

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleButton = ():void => {
        navigate("/create-post", {replace: true,state:{topic:text}});
    }

    return (
        <>
            <div className={styles.wrapper}>
                <img className={styles.img} src={profileImage} alt=""/>
                <input value={text} onChange={handleText} placeholder="Let’s share what going on your mind..." className={styles.text}/>
                <button onClick={handleButton} className={styles.button}>Create Post</button>
            </div>
        </>
    );
};

export default Home;