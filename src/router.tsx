import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/home.tsx";
import Error from "./pages/error/error.tsx";
import CreatePost from "./pages/createPost/createPost.tsx";
import Login from "./pages/login/login.tsx";
import Register from "./pages/register/register.tsx";
import Profile from "./pages/profile/profile.tsx";
import PostPage from "./pages/post/postPage.tsx";
import SearchPost from "./pages/searchPost/searchPost.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>
    },
    {
        path: "/create-post",
        element: <CreatePost/>,
        errorElement: <Error/>
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <Error/>
    },
    {
        path: "/register",
        element: <Register/>,
        errorElement: <Error/>
    },
    {
        path: "/profile",
        element: <Profile/>,
        errorElement: <Error/>
    },
    {
        path: "/posts/:id",
        element: <PostPage/>,
        errorElement: <Error/>
    },
    {
        path: "/search-posts",
        element: <SearchPost/>,
        errorElement: <Error/>
    },
    {
        path: "/profile/:id",
        element: <Profile/>,
        errorElement: <Error/>
    }
]);