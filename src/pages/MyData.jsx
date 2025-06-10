import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { FaMapMarkerAlt, FaUser, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";

const MyData = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    username: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNascimento: "",
    sexo: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const personId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    if (personId && token) {
      fetch(`https://sportsmaniaback.onrender.com/api/persons/${personId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setCliente({
            username: data.username || "",
            email: data.email || "",
            cpf: data.cpf || "",
            telefone: data.telefone || "",
            dataNascimento: data.dataNascimento || "",
            sexo: data.sexo || "",
          });
        });
    }
  }, []);

  const handleChange = (e) => {
    setCliente((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const personId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    if (!personId || !token) {
      setMensagem("Faça login para atualizar os dados.");
      return;
    }
    try {
      const response = await fetch(
        `https://sportsmaniaback.onrender.com/api/persons/${personId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cliente),
        }
      );
      if (response.ok) {
        setMensagem("Dados atualizados com sucesso!");
        setEditMode(false);
      } else {
        setMensagem("Erro ao atualizar dados.");
      }
    } catch {
      setMensagem("Erro ao atualizar dados.");
    }
  };

  // Sidebar navigation
  const navOptions = [
    {
      label: "Pedidos",
      icon: <FaBoxOpen className="mr-2" />,
      onClick: () => navigate("/pedidos"),
      active: false,
    },
    {
      label: "Seus dados",
      icon: <FaUser className="mr-2" />,
      onClick: () => {},
      active: true,
    },
    {
      label: "Endereços",
      icon: <FaMapMarkerAlt className="mr-2" />,
      onClick: () => navigate("/addressUpdate"),
      active: false,
    },
    {
      label: "Sair",
      icon: <FaSignOutAlt className="mr-2" />,
      onClick: () => {
        localStorage.clear();
        navigate("/login");
      },
      active: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />

      <div className="flex flex-1 w-full max-w-7xl mx-auto pt-10 pb-20 gap-8">
        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-2xl shadow p-6 flex flex-col gap-2 h-fit">
          {navOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={opt.onClick}
              className={`flex items-center px-4 py-3 rounded-lg text-left font-medium text-lg transition 
                ${opt.active ? "bg-blue-700 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Seus Dados</h1>
          <div className="bg-white rounded-xl shadow p-8 max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Dados pessoais</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block font-semibold mb-1">Nome completo</label>
                <input
                  type="text"
                  name="username"
                  value={cliente.username}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                  disabled={!editMode}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={cliente.email}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                  disabled={!editMode}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    value={cliente.cpf}
                    onChange={handleChange}
                    className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                    disabled={!editMode}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Telefone</label>
                  <input
                    type="text"
                    name="telefone"
                    value={cliente.telefone}
                    onChange={handleChange}
                    className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Data de nascimento</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={cliente.dataNascimento}
                    onChange={handleChange}
                    className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                    disabled={!editMode}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Sexo</label>
                  <select
                    name="sexo"
                    value={cliente.sexo}
                    onChange={handleChange}
                    className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition bg-white text-blue-900"
                    disabled={!editMode}
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
              </div>
              {editMode ? (
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-bold text-lg shadow transition"
                >
                  Salvar Informações
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-blue-700 py-3 rounded-lg font-bold text-lg shadow transition"
                  onClick={() => setEditMode(true)}
                >
                  Editar Dados
                </button>
              )}
              {mensagem && (
                <div className="text-center mt-2 text-sm text-blue-700 font-semibold">
                  {mensagem}
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyData;