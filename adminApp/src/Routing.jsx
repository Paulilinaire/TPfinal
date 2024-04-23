import { createBrowserRouter } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeDetails />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
]);

export default Routing;
