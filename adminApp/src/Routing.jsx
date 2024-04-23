import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
]);

export default Routing;
