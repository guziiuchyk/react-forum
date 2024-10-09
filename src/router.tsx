import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/home.tsx";
import Error from "./pages/error/error.tsx";
import CreatePost from "./pages/createPost/createPost.tsx";
import Login from "./pages/login/login.tsx";
import Register from "./pages/register/register.tsx";
import MyProfile from "./pages/myProfile/myProfile.tsx";
import PostPage from "./pages/post/postPage.tsx";
import SearchPost from "./pages/searchPost/searchPost.tsx";
import EditPost from "./pages/editPost/editPost.tsx";
import Profile from "./pages/profile/profile.tsx";
import EditProfile from "./pages/editProfile/editProfile.tsx";
import AboutUs from "./pages/aboutUs/aboutUs.tsx";

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
        element: <MyProfile/>,
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
    },
    {
        path: "/edit-post/:id",
        element: <EditPost/>,
        errorElement: <Error/>
    },
    {
        path: "/edit-profile",
        element: <EditProfile/>,
        errorElement: <Error/>
    },
    {
        path: "/about-us",
        element: <AboutUs/>,
        errorElement: <Error/>
    }
]);