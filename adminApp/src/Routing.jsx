import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Test from "./components/Test";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export default Routing;
