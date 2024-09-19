import React from 'react';
import Header from "../../components/header/header.tsx";
import styles from "./login.module.css"
import {Link} from "react-router-dom";

const Login: React.FC = () => {
    return (
        <>
            <Header/>
            <div className={styles.content}>
                <div className={styles.title}>Login</div>
                <input placeholder="Login" className={styles.input} type="text"/>
                <input placeholder="Password" className={styles.input} type="password"/>
                <button className={styles.button}>Sing In</button>
                <div className={styles.sing_up}>Dont have an account? <Link className={styles.link} to={"/register"}>Sing Up</Link></div>
            </div>
        </>
    );
};

export default Login;