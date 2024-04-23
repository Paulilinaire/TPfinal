import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routing from "./Routing.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
         <RouterProvider router={Routing} />
    </React.StrictMode>
);
