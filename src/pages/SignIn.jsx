import React, { useState } from "react";
import { APP_ROUTES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SingIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(email);
    console.log(password);
    // adc autenticação
    navigate(APP_ROUTES.HOME); // Redireciona p home
  }

  const handleSignUpRedirect = () => {
    navigate(APP_ROUTES.SIGN_UP); // Redireciona p tela de cadastro
  }

  return (
    <>
      <div className="flex h-screen flex-row-reverse">
        <div className="bg-yellow-500 rounded-l-[13vw] w-1/3 py-50 items-center">
          <h1 className="text-center font-normal text-4xl mb-4 ">
            Seja bem-vindo a
          </h1>
          <h1 className="text-center font-extrabold text-4xl mb-4 ">
            SPORTS MANIA
          </h1>
          <h3 className="text-center font-normal text-xl mb-4 ">
            Clique abaixo para se registrar
          </h3>
          <div className="flex flex-col items-center">
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
        <div className="flex flex-1 flex-col justify-evenly items-center">
          <h2 className="text-center font-medium text-2xl mb-4 ">
            Entre na sua conta
          </h2>
          <form className="space-y-6 w-2/3 items-center">
            <div>
              <input
                className="bg-gray-300 p-2 rounded-md w-3/3"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
                required
              />
            </div>
            <div>
              <input
                className="bg-gray-300 p-2 rounded-md w-3/3"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                className="flex justify-center p-2 rounded-md w-1/2 self-center bg-yellow-500 hover:bg-yellow-300"
                onClick={handleLogin}
              >
                <span className="font-medium">
                  ENTRAR
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SingIn;
