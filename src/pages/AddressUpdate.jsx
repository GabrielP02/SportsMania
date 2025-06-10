import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const AddressUpdate = () => {
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/addressUpdate");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    if (!personId || !token) {
      setMensagem("Faça login para atualizar o endereço.");
      return;
    }

    const endereco = {
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
    };

    try {
      const response = await fetch(
        `https://sportsmaniaback.onrender.com/api/persons/${personId}/endereco`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(endereco),
        }
      );
      if (response.ok) {
        setMensagem("Endereço atualizado com sucesso!");
      } else {
        setMensagem("Erro ao atualizar endereço.");
      }
    } catch (error) {
      setMensagem("Erro ao atualizar endereço.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="relative flex flex-col items-center justify-center min-h-screen">
        {/* Imagem de fundo desfocada */}
        <img
          src="https://img.freepik.com/fotos-gratis/ferramentas-esportivas_53876-138077.jpg?semt=ais_hybrid&w=740"
          alt="Fundo esportes"
          className="absolute inset-0 w-full h-full object-cover blur-[4px] brightness-75"
          style={{ zIndex: 0 }}
        />
        {/* Overlay para escurecer um pouco */}
        <div className="absolute inset-0 bg-blue-900/40" style={{ zIndex: 1 }}></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen">
          <div className="w-full max-w-2xl bg-blue-700 bg-opacity-95 rounded-2xl shadow-2xl p-12 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow">
              Atualizar Endereço
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="w-1/2 border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-white outline-none transition bg-white text-blue-900"
                  required
                />
                <input
                  type="text"
                  placeholder="UF"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  className="w-1/2 border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-white outline-none transition bg-white text-blue-900"
                  maxLength={2}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="w-full border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-white outline-none transition bg-white text-blue-900"
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="w-1/2 border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-white outline-none transition bg-white text-blue-900"
                  required
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="w-1/2 border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-white outline-none transition bg-white text-blue-900"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full border border-blue-300 rounded-lg p-4 focus:ring-2 focus:ring-white outline-none transition bg-white text-blue-900"
                required
              />
              <button
                type="submit"
                className="w-full bg-white hover:bg-blue-100 text-blue-700 py-4 rounded-lg font-bold text-xl shadow transition"
              >
                Salvar Endereço
              </button>
              {mensagem && (
                <div className="text-center mt-2 text-sm text-white font-semibold">
                  {mensagem}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressUpdate;
