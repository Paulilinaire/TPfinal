import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth-service";
import logo from "../assets/LOGO.png";
import background from "../assets/backgroundLogin.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(mail, password);
      navigate("/dashboard");
    } catch (e) {
      setError("Incorrect logins");
    }
  };

  return (
    <>
      <header className="flex items-center">
        <img src={logo} alt="Logo" className="size-36" />
        <h2 className="text-xl">
          <span style={{ color: "#FA9746" }}>Time</span>
          <span style={{ color: "#233863" }} className="font-bold">Flow</span>
        </h2>
      </header>
      <main className="flex space-x-2.5 items-center">
        <div
          style={{ borderColor: "#B0D0FF" }}
          className="border-2 rounded-lg ml-5 pl-3 w-5/12 drop-shadow"
        >
          <div className="ml-40 mt-28">
            <h3 style={{ color: "#233863" }} className="font-semibold text-xl">
              Welcome back !
            </h3>
            <h2 style={{ color: "#FA9746" }} className="font-medium m-3	">
              Login to continue
            </h2>
          </div>
          {error && (
            <div class="p-4 mb-4 ml-40 w-6/12 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <span class="font-medium">Error: </span> {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="ml-40 mt-4 flex flex-col">
            <input
              type="text"
              placeholder="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              style={{
                borderColor: "#B0D0FF",
              }}
              className="input shadow-inner bg-gray-50 border w-8/12 text-sm rounded-3xl p-2.5"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderColor: "#B0D0FF",
              }}
              className="input shadow-inner bg-gray-50 border w-8/12 text-sm rounded-3xl p-2.5 mt-5"
              required
            />
            <button
              type="submit"
              style={{ backgroundColor: "#233863" }}
              class="mt-5 mb-24 w-8/12 px-6 py-3.5 text-base font-bold text-white rounded-lg text-center"
            >
              Log in
            </button>
          </form>
        </div>
        <img src={background} alt="Background" />
      </main>
    </>
  );
};

export default LoginForm;
