import React from "react";
import { APP_ROUTES } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

const[nome,setNome] = useState('');
const[email,setEmail] = useState('');
const[password,setPassword] = useState('');
const navigate = useNavigate();

const handleClickEntrar = () => {

    navigate(APP_ROUTES.SIGN_IN)
}

const handleRegister = () => {
     console.log(nome);
     console.log(email);
     console.log(password);
}

return(
<>
<div className="flex h-screen">
<div className="bg-yellow-500 rounded-r-[13vw] w-1/3 py-50 items-center">
        <h1 className="text-center font-normal text-4xl mb-4 ">
          Bem-vindo de volta à
        </h1>
        <h1 className="text-center font-extrabold text-4xl mb-4 ">
         SPORTS MANIA
        </h1>
        <h3 className="text-center font-normal text-xl   mb-4 ">
         Acesse sua conta já criada
        </h3>
        <div className="flex flex-col items-center">
              <button 
              className="flex justify-center p-2 rounded-md w-1/3 self-center bg-black hover:bg-neutral-900 text-yellow-300"
              onClick={handleClickEntrar}
              >
                <span className="text-xl font-normal">
                  ENTRAR
                </span>
              </button>
            </div>
</div>
<div className="flex flex-1 flex-col justify-evenly items-center">
        <h2 className="text-center font-medium text-2xl mb-4 ">
          Entre na sua conta
        </h2>
    <div>
        <img>
        </img>
    </div>
          <form className="space-y-6 w-2/3 items-center">
          <div>
              <input
                className="bg-gray-300 p-2 rounded-md w-3/3"
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => { setNome(e.target.value); }}
                required
              />
            </div>
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
                onClick={handleRegister}
                >
                <span className="font-medium">
                  Registre-se
                </span>
              </button>
            </div>
          </form>
        </div>
</div>
</>
    );
}

export default SignUp;
