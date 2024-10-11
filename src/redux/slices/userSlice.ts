import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string;
    id: number;
    email: string;
    bio: string | null;
    profile_picture:string;
    posts: object[]
}

interface AuthState {
    isAuthenticated: boolean | null;
    user: null | UserState;
}

const initialState: AuthState = {
    isAuthenticated: null,
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserState>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
        notAuthorized(state){
            state.isAuthenticated = false;
        }
    },
});

export const {login, logout, notAuthorized} = userSlice.actions;
export default userSlice.reducer;
