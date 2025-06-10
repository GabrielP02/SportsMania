import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { FaEdit } from "react-icons/fa";

const AddressUpdate = () => {
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [savedAddress, setSavedAddress] = useState(null);

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/addressUpdate");
    }
    // Buscar endereço salvo do usuário
    const personId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    if (personId && token) {
      fetch(`https://sportsmaniaback.onrender.com/api/persons/${personId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.endereco) {
            setSavedAddress(data.endereco);
          }
        });
    }
  }, [navigate]);

  const handleEdit = () => {
    if (savedAddress) {
      setCep(savedAddress.cep || "");
      setRua(savedAddress.rua || "");
      setNumero(savedAddress.numero || "");
      setBairro(savedAddress.bairro || "");
      setCidade(savedAddress.cidade || "");
      setUf(savedAddress.uf || "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
        setSavedAddress(endereco);
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

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-8 w-full max-w-4xl text-left">
          Endereços
        </h1>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          {/* Endereço salvo */}
          <div className="flex-1 bg-white rounded shadow-md p-6">
            {savedAddress ? (
              <>
                <div className="mb-2">
                  <span className="font-bold text-lg">
                    {savedAddress.rua} {savedAddress.numero}
                  </span>
                </div>
                <div className="text-gray-500 mb-1">
                  {savedAddress.bairro} - CEP {savedAddress.cep} -{" "}
                  {savedAddress.cidade} - {savedAddress.uf}
                </div>
                <div className="text-gray-400 mb-2">
                  Principal - {localStorage.getItem("clienteNome") || "Usuário"}
                </div>
                <hr className="my-2" />
                <button
                  className="flex items-center gap-2 text-purple-800 hover:underline text-sm mt-2"
                  onClick={handleEdit}
                  type="button"
                >
                  <FaEdit size={16} /> Editar endereço
                </button>
              </>
            ) : (
              <div className="text-gray-500">Nenhum endereço salvo.</div>
            )}
          </div>
          {/* Formulário de adicionar/editar endereço */}
          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-md w-full space-y-4"
            >
              <h2 className="text-xl font-semibold mb-2">
                Adicionar / Editar Endereço
              </h2>
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
      </div>
    </div>
  );
};

export default AddressUpdate;
