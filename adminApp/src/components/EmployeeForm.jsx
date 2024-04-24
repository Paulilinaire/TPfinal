import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import background from "../assets/backgroundForm.jpg";
import { userService } from "../service/user-service";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitles, setJobTitles] = useState([]);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobTitleResponse = await userService.getJobTitles();
        setJobTitles(jobTitleResponse.data);

        const rolesResponse = await userService.getRoles();
        setRoles(rolesResponse.data);

        if (id) {
          const userResponse = await userService.getUserById(id);
          const user = userResponse.data;
          setFirstname(user.firstname);
          setLastname(user.lastname);
          setJobTitle(user.jobTitle);
          setRole(user.role); 
          setEmail(user.email);
        }
      } catch (e) {
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstname,
      lastname,
      jobTitle,
      role,
      email,
      password: id ? undefined : password, // Do not send the password when editing
    };

    try {
      if (id) {
        await userService.updateUser(id, user);
      } else {
        await userService.createUser(user);
      }

      navigate("/dashboard");
    } catch (e) {
      setError("An error occurred while processing the form. Please try again.");
    }
  };

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
            {id ? "Edit Employee" : "Create Employee"} 
          </h3>

          {error && <div className="text-red-600 text-left mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col">
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
                value= {lastname}
                onChange= {(e) => setLastname(e.target.value)}
                style={{ borderColor: "#B0D0FF" }}
                className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-72"
                required
              />
            </div>
            <div className="flex flex-row gap-6">
            <select
              value={jobTitle}
              onChange ={(e) => setJobTitle(e.target.value)}
              style={{ borderColor: "#B0D0FF" }}
              className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-full mt-4"
            >
              <option value="" disabled>
                Choose a job title
              </option>
              {jobTitles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>

            <select
              value={role}
              onChange ={(e) => setRole(e.target.value)}
              style={{ borderColor: "#B0D0FF" }}
              className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-full mt-4"
            >
              <option value="" disabled>
                Choose a role
              </option>
              {roles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange= {(e) => setEmail(e.target.value)}
              style={{ borderColor: "#B0D0FF" }}
              className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-full mt-4"
              required
            />
            {id ? (
              <div className="text-left">
                * Password change not allowed when editing
              </div>
            ) : (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange= {(e) => setPassword(e.target.value)}
                style={{ borderColor: "#B0D0FF" }}
                className="shadow-inner bg-gray-50 border text-sm rounded-3xl p-3 w-full mt-4"
                required
              />
            )}

            <div className="flex justify-between w-full mt-6">
              <button
                type="button"
                style={{ backgroundColor: "#FA9746" }}
                class="px-6 py-3 text-base font-bold text-white rounded-lg text-center"
                onClick={() => navigate(-1)}
              > <i className="bi bi-x-lg me-2"></i>
                Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: "#3586FD" }}
                className="px-6 py-3 text-base font-bold text-white rounded-lg text-center"
              > <i className="bi bi-check-circle-fill me-2"></i>
                {id ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;

