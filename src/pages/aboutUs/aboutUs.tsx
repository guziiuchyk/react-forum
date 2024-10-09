import Header from "../../components/header/header.tsx";
import styles from "./aboutUs.module.css"
import React from "react";

const AboutUs:React.FC = () =>{
    return (
        <>
            <Header/>
            <div className={styles.wrapper}>About us</div>
        </>
    )
}

export default AboutUs;