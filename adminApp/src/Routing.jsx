import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard.jsx";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);

export default Routing;
