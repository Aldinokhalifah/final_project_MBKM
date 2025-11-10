import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../component/Layout/Layout";

export const routes = createBrowserRouter([{
    path: "/",
    element: < Layout / > ,
    children: [{
        path: "/",
        element: < Home / > ,
    }, ],
}, ]);