import React, {useEffect, useRef, useState} from "react";
import styles from "./message.module.css";
import axios from "axios";
import {API_URL} from "../../../config.ts";

interface MessageProps {
    id: number;
    message: string;
    isAuthor: boolean;
    profile_image: string;
}

const Message: React.FC<MessageProps> = (props: MessageProps) => {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [showContextMenu,setShowContextMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const handleDeleteButton = () => {
        axios.delete(`${API_URL}/api/chats/${props.id}/delete-message`).then(() => {
            wrapperRef.current?.remove();
        })
    }

    const handleClickOutside = () => {
        setShowContextMenu(false);
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        setMenuPosition({ x: event.pageX, y: event.pageY });
        setShowContextMenu(true);
    };

    useEffect(() => {
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        }
    }, [])

    return (
        <>
            <div onContextMenu={handleContextMenu} ref={wrapperRef} className={styles.message_wrapper}
                 style={props.isAuthor ? {flexDirection: 'row-reverse'} : {}}>
                <img className={styles.image} src={props.profile_image} alt="profile"/>
                <div className={styles.message}>{props.message}</div>
            </div>
            {showContextMenu ? <div
                className={styles.context_menu}
                style={{top: menuPosition.y, left: menuPosition.x}}
            >
                <button onClick={() => handleDeleteButton()}>Действие 1</button>
                <button onClick={() => console.log("Action 2")}>Действие 2</button>
            </div> : null}
        </>
    );
}

export default Message;
