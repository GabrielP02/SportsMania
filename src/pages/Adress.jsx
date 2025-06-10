import React, { useEffect } from "react";
import Navbar from "../components/NavBar";
import LojaFisicaSM from "../assets/LojaFisicaSM.png";

const Adress = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API}&callback=Function.prototype&loading=async&libraries=maps,marker&v=beta`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10 bg-white min-h-screen">
        {/* Título */}
        <h1 className="text-3xl font-semibold mb-2 border-b-2 border-blue-500 w-fit">
          Conheça a nossa loja
        </h1>

        {/* Descrição adicional */}
        <div className="mt-4 mb-8">
          <p className="text-lg text-blue-700 font-semibold">
            Sua loja esportiva no coração da cidade! Desfrute da conveniência e
            acessibilidade de nossa localização privilegiada.
          </p>
        </div>

        {/* Horário de Funcionamento */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">
            Horário de Funcionamento
          </h3>
          <ul className="text-gray-700 ml-2">
            <li>Seg-Sex: 9h às 18h</li>
            <li>Sábado: 9h às 14h</li>
            <li>Domingo: Fechado</li>
          </ul>
        </div>

        {/* Complemento sobre localização */}
        <div className="mb-8">
          <p className="text-gray-700">
            Nossa localização facilita o acesso aos recursos e serviços essenciais
            para uma experiência esportiva completa.
          </p>
        </div>

        {/* Bloco principal */}
        <div className="flex flex-col md:flex-row gap-8 mt-6 items-center">
          {/* Imagem da loja */}
          <div className="border-2 border-blue-400 p-1 bg-white">
            <img
              src={LojaFisicaSM}
              alt="Foto da loja"
              className="w-[350px] md:w-[400px] h-auto object-cover"
            />
          </div>
          {/* Texto de boas-vindas */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl text-blue-600 font-bold mb-2">
              Venha nos fazer uma visita! Ficaremos felizes em atendê-lo.
            </h2>
            <p className="mb-2 text-gray-700">
              Quer conhecer nossa loja física, nosso atendimento e ver de perto
              nossos produtos?
            </p>
            <p className="text-gray-700">
              Então venha nos fazer uma visita! Teremos todo o prazer em lhe
              atender.
            </p>
          </div>
        </div>

        {/* Localização */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2 border-b border-gray-300 w-fit">
            Onde estamos localizados
          </h3>
          <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-2 w-fit">
            <span className="text-xl text-gray-600">📍</span>
            <span className="text-gray-700">
              Rua Aurora, nº 369 – Jardim Perola, Birigui – SP
            </span>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-10 flex justify-center">
          <div id="map_canvas" style={{ width: 700, height: 400 }}>
            <gmp-map
              center="-8.022706985473633,-34.91827392578125"
              zoom="17"
              map-id="DEMO_MAP_ID"
            >
              <gmp-advanced-marker
                position="-8.022706985473633,-34.91827392578125"
                title="Nossa loja"
              ></gmp-advanced-marker>
            </gmp-map>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adress;
