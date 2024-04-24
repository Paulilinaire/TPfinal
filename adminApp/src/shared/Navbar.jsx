import { Link } from "react-router-dom";
import logo from "../assets/LOGO.png";

const Navbar = () => {

  return (
    <div className="bg-white w-screen flex items-center justify-between pe-20 shadow-lg">
      <Link to="/dashboard" className="flex items-center space-x-2 ps-5">
        <img src={logo} alt="Logo" className="size-36" /> 
        <h2 className="text-2xl">
          <span style={{ color: "#FA9746" }}>Time</span>
          <span style={{ color: "#233863" }} className="font-bold">Flow</span>
        </h2>
      </Link>
      <Link to="/form" className="flex items-center jutify-end">
        <button
          style={{ backgroundColor: "#3586FD" }}
          className="px-6 py-4 w-50 text-base font-bold text-white rounded-full flex items-center drop-shadow-lg"
        >
          <i className="bi bi-plus-circle-fill me-2"></i>Add employee
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
