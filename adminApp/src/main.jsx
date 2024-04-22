import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { RouterProvider } from "react-router-dom";
// import router from "./app-routing.js";
import LoginForm from "./components/LoginForm.jsx";
import Dashboard from "./components/Dashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <RouterProvider router={router} /> */}
        {/*<LoginForm />*/}
        <Dashboard />
    </React.StrictMode>
);
