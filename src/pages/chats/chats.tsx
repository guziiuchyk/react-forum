import styles from "./chats.module.css"
import Header from "../../components/header/header.tsx";
import React from "react";
import Chat from "./chat/chat.tsx";

const Chats: React.FC = () => {
    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <div className={styles.title}>Chats</div>
                <div className={styles.chats}>
                    <Chat profile_image={"http://127.0.0.1:8000/uploads/default.jpg"}
                          last_message={"lorem ipsum is dolor..."} username={"Asta"} user_id={1}/>
                    <Chat profile_image={"http://127.0.0.1:8000/uploads/default.jpg"}
                          last_message={"lorem ipsum is dolor..."} username={"Asta"} user_id={1}/>
                    <Chat profile_image={"http://127.0.0.1:8000/uploads/default.jpg"}
                          last_message={"lorem ipsum is dolor..."} username={"Asta"} user_id={1}/>
                    <Chat profile_image={"http://127.0.0.1:8000/uploads/default.jpg"}
                          last_message={"lorem ipsum is dolor..."} username={"Asta"} user_id={1}/>
                    <Chat profile_image={"http://127.0.0.1:8000/uploads/default.jpg"}
                          last_message={"lorem ipsum is dolor..."} username={"Asta"} user_id={1}/>
                    <Chat profile_image={"http://127.0.0.1:8000/uploads/default.jpg"}
                          last_message={"lorem ipsum is dolor..."} username={"Asta"} user_id={1}/>
                </div>
            </div>
        </>
    )
}

export default Chats