import React from "react";
import Header from "../../components/header/header.tsx";
import styles from "./Error.module.css";

const Error:React.FC = () => {
    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <div className={styles.title}>404</div>
                <div className={styles.text}>Page not found</div>
            </div>
        </>
    );
};

export default Error;