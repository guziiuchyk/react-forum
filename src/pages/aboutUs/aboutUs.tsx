import Header from "../../components/header/header.tsx";
import styles from "./aboutUs.module.css"
import React from "react";

const AboutUs:React.FC = () =>{
    return (
        <>
            <Header/>

            <div className={styles.wrapper}>
                <div className={styles.about_us}>
                    <div className={styles.title}>About Our Project</div>
                    <div>This forum is a pet project aimed at creating a functional and stylish community platform.</div>
                </div>

                <div className={styles.team}>
                    <div className={styles.title}>Our Team</div>
                    <div><strong>Nazar:</strong> Front-end Developer</div>
                    <div><strong>Maxim:</strong> Back-end Developer</div>
                </div>

                <div className={styles.project_info}>
                    <div className={styles.title}>Project Information</div>
                    <div className={styles.project_info__text}>You can check out the source code on GitHub:</div>
                    <div><a href="https://github.com/guziiuchyk/react-forum" target="_blank">Frontend Repository</a></div>
                    <div><a href="https://github.com/twonumberfortyfives/fast-api-web-sockets" target="_blank">Backend Repository</a></div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;