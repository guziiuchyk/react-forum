import React from "react";
import styles from "./message.module.css";

interface MessageProps {
    message: string;
    isAuthor: boolean;
    profile_image: string;
}

const Message: React.FC<MessageProps> = (props: MessageProps) => {
    return (
        <div className={styles.message_wrapper} style={props.isAuthor ? {flexDirection : 'row-reverse' } : {}}>
            <img className={styles.image} src={props.profile_image} alt="profile" />
            <div className={styles.message}>{props.message}</div>
        </div>
    );
}

export default Message;
