import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { login } from "../redux/slices/userSlice.ts";

const useAuth = (): boolean => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) return;

        const checkAuthentication = async (): Promise<void> => {
            try {
                await axios.get("http://localhost:8000/api/is-authenticated", { withCredentials: true });

                const profile = await axios.get("http://localhost:8000/api/my-profile", { withCredentials: true });

                dispatch(login(profile.data));
            } catch {
                console.log("Not authenticated");
            }
        };

        checkAuthentication();
    }, [isAuthenticated, dispatch]);

    return isAuthenticated;
};

export default useAuth;
