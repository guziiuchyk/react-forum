import React from "react";
import styles from "./header.module.css"
import {Link} from "react-router-dom";
import homeImage from "../../assets/home.svg"
import messageImage from "../../assets/message.svg"
import searchImage from "../../assets/search_icon.svg"
import notificationImage from "../../assets/notification.svg"
import profileImage from "../../assets/profile.svg"
import groupImage from "../../assets/group.svg"
import aboutUsImg from "../../assets/about-us.svg"

const Header:React.FC = () => {
    return <header className={styles.wrapper}>
        <div className={styles.logo_and_nav}>
            <div className={styles.logo}>
                <span className={styles.logo__img}>G</span>
                <div className={styles.logo__text}>Huziichuk</div>
            </div>
            <nav className={styles.links}>
                <Link to={"/"} className={styles.link_wrapper}><img src={homeImage} alt="home link"/></Link>
                <Link to={"/groups"} className={styles.link_wrapper}><img src={groupImage} alt="groups link"/></Link>
                <Link to={"/about-us"} className={styles.link_wrapper}><img src={aboutUsImg}
                                                                            alt="about us link"/></Link>
            </nav>
        </div>
        <div className={styles.search_wrapper}>
            <input placeholder="Type here to search..." className={styles.search} type="text" maxLength={40}/>
            <button className={styles.search__button}><img className={styles.search__button__img} src={searchImage}
                                                           alt="search"/></button>
        </div>
        <div className={styles.profile_wrapper}>
            <Link to={"/"} className={styles.profile__link}><img src={notificationImage}
                                                                 alt="notifications link"/></Link>
            <Link to={"/"} className={styles.profile__link}><img src={messageImage} alt="messages link"/></Link>
            <div className={styles.profile}>
                <img className={styles.profile__img} src={profileImage} alt="profile"/>
                <Link to={"/profile"} className={styles.profile__name}>Asta1945</Link>
                <div className={styles.profile__pop_up}>¤</div>
            </div>
        </div>
    </header>
}

export default Header