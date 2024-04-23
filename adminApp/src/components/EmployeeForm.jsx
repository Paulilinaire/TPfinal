import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import background from "../assets/backgroundForm.jpg";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       await userService.addEmployee(firstname, lastname, jobTitle, email, password);
  //             navigate("/Dashboard"); // Changez par la route correcte

  //     } catch (e) {
  //       setError("An error occurred while adding the employee. Please try again.");
  //     }
  //   };

  return (
    <>
      <Navbar />
      <div
        className="relative h-screen bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div
          style={{ borderColor: "#B0D0FF" }}
          className="border-2 rounded-lg p-14 bg-white drop-shadow-lg z-10 flex flex-col align-items-center mt-20"
        >
          <h3
            style={{ color: "#233863" }}
            className="font-semibold text-2xl text-left mb-6"
          >
            Create Employee
          </h3>

          <form className="flex flex-col">
            <div className="flex flex-row gap-6">
              <input
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                style={{ borderColor: "#B0D0FF" }}
                className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-72"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                style={{ borderColor: "#B0D0FF" }}
                className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-72"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              style={{ borderColor: "#B0D0FF" }}
              className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-full mt-4"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: "#B0D0FF" }}
              className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-full mt-4"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: "#B0D0FF" }}
              className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-full mt-4"
              required
            />

            <div className="flex justify-between w-full mt-6">
              <button
                type="button"
                style={{ backgroundColor: "#FA9746" }}
                className="px-6 py-3 text-base font-bold text-white rounded-lg text-center"
                onClick={() => navigate(-1)}
              >
                <i class="bi bi-x-lg me-2"></i>Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: "#3586FD" }}
                className="px-6 py-3 text-base font-bold text-white rounded-lg text-center"
              >
                <i class="bi bi-check-circle-fill me-2"></i>Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
