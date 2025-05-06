import React, { useState } from "react";
import { APP_ROUTES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    console.log(email);
    console.log(password);
    // Adicione aqui sua lógica de autenticação

    // Redireciona para a homepage após o login
    navigate(APP_ROUTES.HOME_PAGE);
  }

  const handleSignUpRedirect = () => {
    navigate(APP_ROUTES.SIGN_UP);
  }

  return (
    <div className="flex flex-row-reverse items-center h-auto min-h-screen">

      <div className="bg-yellow-500 rounded-l-[13vw] w-1/2 flex flex-col items-center justify-center h-screen gap-8">
        <h1 className="text-center font-normal text-4xl mb-4">
          Seja bem-vindo a
        </h1>
        <h1 className="text-center font-extrabold text-4xl mb-4">
          SPORTS MANIA
        </h1>
        <h3 className="text-center font-normal text-xl mb-4">
          Clique abaixo para se registrar
        </h3>
        <div className="flex flex-col items-center w-3/3">
          <button
            className="flex justify-center p-2 rounded-md w-1/3 self-center bg-black hover:bg-neutral-900 text-yellow-300"
            onClick={handleSignUpRedirect}
          >
            <span className="text-xl font-normal">
              REGISTRE-SE
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-1/2 ">

        <h2 className="text-center font-medium text-2xl mb-4">
          Entre na sua conta
        </h2>
        <div className="flex flex-1 flex-col justify-evenly items-center">

          <form className='space-y-8 sm:space-y-6 w-2/3 items-center'>
            <div>
              <input
                className="border-2 outline-none rounded-md w-3/3 "
                type="email"
                placeholder="Digite seu E-mail"
                value={email}
                required
                onChange={(e) => { setEmail(e.target.value); }}
              />
            </div>
            <div>
              <input
                className="border-2 outline-none rounded-md w-3/3"
                type="password"
                placeholder="*******"
                value={password}
                required
                onChange={(e) => { setPassword(e.target.value); }}
              />
            </div>
            <div className="flex flex-col items-center w-3/3">
              <button
                className="flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-800  text-white hover:bg-gray-700 hover:scale-102  transition-all duration-150 ease-in-out"
                onClick={handleLogin}
              >
                <span>
                  Entrar
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default SignIn;