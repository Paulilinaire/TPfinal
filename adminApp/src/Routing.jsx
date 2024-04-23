import { createBrowserRouter } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeDetails />,
  },
]);

export default Routing;
