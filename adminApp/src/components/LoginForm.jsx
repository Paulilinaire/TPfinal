import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth-service";

const LoginForm = () => {
  //   const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.prevendDefault();
    try {
      await authService.login(mail, password);
      // navigate();
    } catch (e) {
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <>
      <div className="flex content-between">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome back
            </h2>
            <h3 className="text-center text-1xl leading-9 tracking-tight text-gray-900">
              Login to continue
            </h3>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <div class="mt-2">
                  <input
                    id="mail"
                    name="mail"
                    type="mail"
                    required
                    placeholder="Email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default LoginForm;
