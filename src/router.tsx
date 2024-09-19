import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/home.tsx";
import Error from "./pages/error/error.tsx";
import CreatePost from "./pages/createPost/createPost.tsx";
import Login from "./pages/login/login.tsx";
import Register from "./pages/register/register.tsx";

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
]);