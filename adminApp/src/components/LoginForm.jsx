import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth-service";

const LoginForm = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(mail, password);
      // navigate();
      // Insérer lien page d'accueil
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
            {error && <span>{error}</span>}
          </div>
          <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="sm:mx-auto sm:w-full sm:max-w-sm"
              onSubmit={handleLogin}
            >
              <div>
                <div className="mt-2">
                  <input
                    id="mail"
                    name="mail"
                    type="mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                    placeholder="Email"
                    className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className=" mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
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
