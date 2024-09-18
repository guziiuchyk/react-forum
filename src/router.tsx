import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/home.tsx";
import Error from "./pages/error/error.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error/>
    },

]);