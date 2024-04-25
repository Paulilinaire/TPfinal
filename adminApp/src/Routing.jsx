import { createBrowserRouter, redirect } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeForm from "./components/EmployeeForm";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";

const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  if (!!user) {
    return true;
  } else {
    return redirect("/");
  }
};

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: () => isLoggedIn(),
  },
  {
    path: "/details/:id",
    element: <EmployeeDetails />,
    loader: () => isLoggedIn(),
  },
  {
    path: "/form/:id?",
    element: <EmployeeForm />,
    loader: () => isLoggedIn(),
  },
]);

export default Routing;
