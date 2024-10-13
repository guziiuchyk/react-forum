import styles from "./settings.module.css"
import Header from "../../components/header/header.tsx";
import React, {useEffect} from "react";
import useAuth from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

const Settings: React.FC = () => {

    const isAuth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuth === false){
            navigate("/login");
        }
    }, [isAuth, navigate])

    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <div className={styles.title}>settings</div>
                <div></div>
            </div>
        </>
    )
}

export default Settings;