import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Ícones para abrir/fechar

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão de menu hambúrguer */}
      <button className="p-2 text-black" onClick={() => setIsOpen(true)}>
        <Menu size={30} />
      </button>


      {/* Sidebar */}
      <div
  className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out z-50`}
>
        {/* Botão para fechar */}
        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <X size={30} />
        </button>

        {/* Conteúdo do menu */}
        <div className="p-6">
          <h2 className="font-bold text-lg mb-4">Minha Conta</h2>
          <ul className="space-y-3">
            <li>
              <Link to="/pedidos" className="flex justify-between text-gray-600 hover:text-black">
                Meus pedidos <span className="text-yellow-500">{">"}</span>
              </Link>
            </li>
            <li>
              <Link to="/favoritos" className="flex justify-between text-gray-600 hover:text-black">
                Favoritos <span className="text-yellow-500">{">"}</span>
              </Link>
            </li>
          </ul>

          <h2 className="font-bold text-lg mt-6 mb-4">Meu Cadastro</h2>
          <ul className="space-y-3">
            <li>
              <Link to="/cadastro" className="flex justify-between text-gray-600 hover:text-black">
                Alterar dados cadastrais <span className="text-yellow-500">{">"}</span>
              </Link>
            </li>
            <li>
              <Link to="/enderecos" className="flex justify-between text-gray-600 hover:text-black">
                Meus endereços <span className="text-yellow-500">{">"}</span>
              </Link>
            </li>
            <li>
              <Link to="/cartoes" className="flex justify-between text-gray-600 hover:text-black">
                Meus cartões <span className="text-yellow-500">{">"}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
