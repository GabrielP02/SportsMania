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
       <Navbar/>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Atualizar Endereço</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
        >
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="UF"
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
          >
            Salvar Endereço
          </button>
          {mensagem && (
            <div className="text-center mt-2 text-sm text-red-600">
              {mensagem}
            </div>
          )}
        </form>
      </div>

    </div>
  );
};

export default AddressUpdate;
