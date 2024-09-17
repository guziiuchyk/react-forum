import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/home.tsx";
import Forum from "./pages/forum/forum.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/forum",
        element: <Forum/>,
    },
]);