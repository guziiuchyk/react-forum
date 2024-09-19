import React from 'react';
import Header from "../../components/header/header.tsx";
import styles from "./register.module.css"
import {Link} from "react-router-dom";

const Register: React.FC = () => {
    return (
        <>
            <Header/>
            <div className={styles.content}>
                <div className={styles.title}>Register</div>
                <input placeholder="Login" className={styles.input} type="text"/>
                <input placeholder="Email" className={styles.input} type="email"/>
                <input placeholder="Password" className={styles.input} type="password"/>
                <input placeholder="Password again" className={styles.input} type="password"/>
                <button className={styles.button}>Sing Up</button>
                <div className={styles.sing_up}>Do you have an account? <Link className={styles.link} to={"/login"}>Sing
                    In</Link></div>
            </div>
        </>
    );
};

export default Register;