import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Perfil = () => {
  const navigate = useNavigate();


  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/perfil");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">

      <nav className="bg-black text-white flex items-center justify-between p-4">
        <button className="text-xl">
          <FiMenu />
        </button>
        <input
          type="text"
          placeholder="Pesquisar.."
          className="px-2 py-1 rounded"
        />
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Sobre</a>
          <a href="#" className="hover:underline">Contato</a>
          <FiHeart />
          <FiShoppingCart />
        </div>
      </nav>


      <div className="flex flex-1 p-6">

        <div className="w-1/4">
          <h2 className="font-bold">Minha Conta</h2>
          <ul className="space-y-2 mt-2">
            <li className="text-gray-500">Meus pedidos &gt;</li>
            <li>Favoritos &gt;</li>
            <li className="font-bold">Meu Cadastro &gt;</li>
            <li>Alterar dados cadastrais &gt;</li>
            <li>Meus endereços &gt;</li>
            <li>Meus cartões &gt;</li>
          </ul>
        </div>

        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold">Meus Pedidos</h1>
          <p className="mt-4">Nenhum pedido encontrado :</p>
          <p className="text-gray-500 text-sm">
            Caso tenha realizado alguma compra mais antiga, tente acessar pela
            área de atendimento ao cliente.
          </p>
        </div>
      </div>


      <footer className="bg-black text-white p-6 flex justify-between">
        <div className="space-y-2">
          <p className="flex items-center space-x-2">
            <FaInstagram /> <span>@sm_sportsmania</span>
          </p>
          <p className="flex items-center space-x-2">
            <FaWhatsapp /> <span>(81) 9 9182-0455</span>
          </p>
          <p className="flex items-center space-x-2">
            <FaFacebook /> <span>SM Sports Mania</span>
          </p>
        </div>
        <div>
          <h2 className="font-bold">Localização:</h2>
          <p>Rua Pedro Allain, 81 - Loja 5 - Casa Amarela, Recife - PE, 52070-210</p>
          <div className="mt-2">
            <iframe
              src="https://www.google.com/maps/embed?..."
              width="200"
              height="150"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Perfil;
