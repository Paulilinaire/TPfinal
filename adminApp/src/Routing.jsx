import { createBrowserRouter } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeForm />,
  },
]);

export default Routing;
