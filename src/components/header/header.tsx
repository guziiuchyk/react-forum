import React, {useEffect, useRef} from "react";
import styles from "./header.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import homeImage from "../../assets/home.svg";
import messageImage from "../../assets/message.svg";
import searchImage from "../../assets/search_icon.svg";
import notificationImage from "../../assets/notification.svg";
import profileImage from "../../assets/profile.svg";
import groupImage from "../../assets/group.svg";
import aboutUsImg from "../../assets/about-us.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../redux/store';
import useAuth from "../../hooks/useAuth.ts";
import {setSearchValue} from "../../redux/slices/searchSlice.ts";

const Header: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const isAuthenticated = useAuth();

    const searchText = useSelector((state: RootState) => state.search.value);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setSearchValue(e.target.value));
        if (location.pathname !== "/search-posts" && e.target.value !== "") {
            navigate("/search-posts");
            return
        }
        if(e.target.value === ""){
            navigate("/");
        }
    };

    console.log(location.pathname);

    useEffect(() => {
        if (location.pathname !== "/search-posts") {
            dispatch(setSearchValue(""));
        }
    }, [location.pathname, dispatch]);

    useEffect(() => {
        if (location.pathname === "/search-posts") {
            inputRef.current?.focus();
        }
    }, [location.pathname, searchText, navigate]);

    return (
        <header className={styles.wrapper}>
            <div className={styles.logo_and_nav}>
                <div className={styles.logo}>
                    <span className={styles.logo__img}>A</span>
                    <div className={styles.logo__text}>Agora</div>
                </div>
                <nav className={styles.links}>
                    <Link to={"/"} className={styles.link_wrapper}>
                        <img src={homeImage} alt="home link"/>
                    </Link>
                    <Link to={"/groups"} className={styles.link_wrapper}>
                        <img src={groupImage} alt="groups link"/>
                    </Link>
                    <Link to={"/about-us"} className={styles.link_wrapper}>
                        <img src={aboutUsImg} alt="about us link"/>
                    </Link>
                </nav>
            </div>
            <div className={styles.search_wrapper}>
                <input
                    ref={inputRef}
                    value={searchText}
                    onChange={handleInput}
                    placeholder="Type here to search..."
                    className={styles.search}
                    type="text"
                    maxLength={40}
                />
                <Link to={"/search-posts"} className={styles.search__button}>
                    <img className={styles.search__button__img} src={searchImage} alt="search"/>
                </Link>
            </div>
            {isAuthenticated ? (
                <div className={styles.profile_wrapper}>
                    <Link to={"/"} className={styles.profile__link}>
                        <img src={notificationImage} alt="notifications link"/>
                    </Link>
                    <Link to={"/"} className={styles.profile__link}>
                        <img src={messageImage} alt="messages link"/>
                    </Link>
                    <div className={styles.profile}>
                        <img className={styles.profile__img} src={profileImage} alt="profile"/>
                        <Link to={"/profile"} className={styles.profile__name}>
                            {user?.username}
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={styles.login}>
                    <Link className={styles.login__button} to={"/login"}>
                        Login
                    </Link>
                    <span className={styles.separator}> | </span>
                    <Link className={styles.login__button} to={"/register"}>
                        Register
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
