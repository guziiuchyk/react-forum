import {useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {login, notAuthorized} from "../redux/slices/userSlice.ts";

const useAuth = (): boolean | null => {

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {

        const checkAuthentication = async (): Promise<void> => {
            if (isAuthenticated !== null) return;
            try {
                const profile = await axios.get("http://localhost:8000/api/my-profile", { withCredentials: true });
                dispatch(login(profile.data));
            } catch {
                dispatch(notAuthorized())
            }
        };

        if (isAuthenticated === null) {
            checkAuthentication();
        }
    }, [isAuthenticated, dispatch]);

    return isAuthenticated;
};

export default useAuth;
