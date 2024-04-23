import { createBrowserRouter } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeForm from "./components/EmployeeForm";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";

const Routing = createBrowserRouter([
  {
    path:"/",
    element:<LoginForm/>
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/details",
    element: <EmployeeDetails />,
  },
  {
    path: "/form",
    element: <EmployeeForm />,
  },
]);

export default Routing;
