import React from "react";
import { APP_ROUTES } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClickEntrar = () => {

    navigate(APP_ROUTES.SIGN_IN)
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sportsmaniaback.onrender.com/api/persons/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          username: nome, // usa o campo nome como username
          password,
          email,
          personType: "ADMIN" // ou "USER", conforme sua regra
        }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate(APP_ROUTES.SIGN_IN);
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    }
  }

  return (
    <>
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
              onClick={handleClickEntrar}
            >
              <span className="text-xl font-normal">
                REGISTRE-SE
              </span>
            </button>
          </div>
        </div>

        <div className="h-1/2 shadow-lg rounded-md bg-white p-8 flex flex-col w-2/3 sm:w-1/2">

          <h2 className="text-center font-medium text-2xl mb-4">
            Entre na sua conta
          </h2>

          <div className="flex flex-col justify-center items-center w-full">
            <form className='gap-8 flex flex-col justify-center items-center w-full'>
              <div>
                <input
                  className="border-2 outline-none rounded-md w-3/3"
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  required
                  onChange={(e) => { setNome(e.target.value); }}
                />
              </div>
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
                  onClick={handleRegister}
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
    </>
  );
}

export default SignUp;
