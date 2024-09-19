import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/home.tsx";
import Error from "./pages/error/error.tsx";
import CreatePost from "./pages/createPost/createPost.tsx";

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
]);