import React, {useEffect, useState} from 'react';
import Header from "../../components/header/header.tsx";
import styles from "./login.module.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth.ts";
import {useDispatch} from "react-redux";
import {login} from "../../redux/slices/userSlice.ts";

const Login: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuth = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuth) {
            navigate("/profile");
        }
    })

    const handleLogin = (): void => {

        if (!email || !password) {
            setError("Wrong email or password");
            return;
        }

        axios.post("http://localhost:8000/api/login", {email, password}, {
            withCredentials: true
        })
            .then((res) => {
                dispatch(login(res.data.token));
                setError("");
                const from: string = location.state?.from?.pathname || '/profile';
                console.log(location.state)
                navigate(from, { replace: true });
        }).catch(() => {
            setError("Wrong email or password");
        })

    }

    const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }
    return (
        <>
            <Header/>
            <div className={styles.content}>
                <div className={styles.title}>Login</div>
                <span className={styles.error}>{error}</span>
                <input onChange={onChangeLogin} value={email} placeholder="Email" className={styles.input} type="text"/>
                <input onChange={onChangePassword} value={password} placeholder="Password" className={styles.input}
                       type="password"/>
                <button onClick={handleLogin} className={styles.button}>Sing In</button>
                <div className={styles.sing_up}>Dont have an account? <Link className={styles.link} to={"/register"}>Sing
                    Up</Link></div>
            </div>
        </>
    );
};

export default Login;