import Header from "../../components/header/header.tsx";
import styles from "./editProfile.module.css"
import React, {useEffect, useRef, useState} from "react";
import useAuth from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import axios from "axios";
import {login} from "../../redux/slices/userSlice.ts";
import {UserPostType, UserType} from "../../types/types.ts";

const EditProfile: React.FC = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    const dispatch = useDispatch()


    const handleUploadFileButton = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file)
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImageSrc(result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return
        }
        if (user) {
            setName(user.username);
            setBio(user.bio ? user.bio : "");
        }
    }, [user, isAuthenticated, navigate]);

    const handleChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleChangeBioInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(e.target.value);
    }

    const handleConfirmButton = () => {
        const formData = new FormData();
        if (file) {
            formData.append("profile_picture", file);
        } else {
            formData.append("profile_picture", "");
        }
        axios.patch<UserType>(`http://localhost:8000/api/my-profile?username=${name}&bio=${bio}`, formData , {
            withCredentials: true, headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            if (user) {
                const newUser: UserType = {
                    ...response.data,
                    posts: user.posts as UserPostType[]
                };
                dispatch(login(newUser));
                navigate("/profile");
            }
        })

    }

    return (<>
        <Header/>
        <div className={styles.wrapper}>
            <div className={styles.profile}>
                <button onClick={handleUploadFileButton} className={styles.upload_button}>
                    {imageSrc ? <img height={200} width={200} className={styles.editImage__image} src={imageSrc}
                                     alt="profile"/> :
                        <img height={200} width={200} className={styles.editImage__image} src={user?.profile_picture}
                             alt="profile"/>}
                </button>
                <input onChange={handleFileChange} ref={fileInputRef} style={{display: "none"}} type="file"
                       accept="image/*"/>
                <div className={styles.profile__info}>
                    <input onChange={handleChangeNameInput} type="text" value={name} className={styles.profile__name}/>
                    <textarea onChange={handleChangeBioInput} value={bio} placeholder="Bio"
                              className={styles.profile__bio}/>
                </div>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => {
                    navigate(-1)
                }} className={styles.cancel}>Cancel
                </button>
                <button onClick={handleConfirmButton} className={styles.confirm}>Save</button>
            </div>
        </div>

    </>)
}

export default EditProfile