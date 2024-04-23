import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import background from "../assets/backgroundDetails.jpg";

const EmployeeDetails = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div
        className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div
          style={{ borderColor: "#B0D0FF" }}
          className="border-2 rounded-lg p-16 bg-white drop-shadow-lg z-10 flex flex-col justify-center align-items-center"
        >
          <h3
            style={{ color: "#233863" }}
            className="font-bold text-2xl text-left mb-6"
          >
            Employee Details
          </h3>
          <ul>
            <li style={{ color: "#233863" }} class="font-bold">
              Fonction:{" "}
            </li>
            <hr className="h-px bg-blue-200 border-0 mb-4" />
            <li style={{ color: "#233863" }} class="font-bold">
              Lastname:{" "}
            </li>
            <hr className="h-px bg-blue-200 border-0 mb-4" />
            <li style={{ color: "#233863" }} class="font-bold">
              Firstname:{" "}
            </li>
            <hr className="h-px bg-blue-200 border-0 mb-4" />
            <li style={{ color: "#233863" }} class="font-bold">
              Email:{" "}
            </li>
            <hr className="h-px bg-blue-200 border-0 mb-4" />
          </ul>
          <div className="flex justify-between w-full me-5 mt-6">
            <button
              type="button"
              style={{ backgroundColor: "#FA9746" }}
              className="px-5 py-3 text-base font-bold text-white rounded-lg text-center"
              onClick={() => navigate(-1)}
            >
              <i class="bi bi-trash-fill me-2"></i>Delete
            </button>
            <button
              type="submit"
              style={{ backgroundColor: "#3586FD" }}
              className="px-7 py-3 text-base font-bold text-white rounded-lg text-center"
            >
              <i class="bi bi-pencil-fill me-2"></i>Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
