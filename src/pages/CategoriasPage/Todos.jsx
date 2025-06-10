import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/constants";
import Navbar from "../../components/NavBar"

const categorias = [
  { nome: "Natação", rota: APP_ROUTES.NATACAO },
  { nome: "Futebol", rota: APP_ROUTES.FUTEBOL },
  { nome: "Academia", rota: APP_ROUTES.ACADEMIA },
  { nome: "Luta", rota: APP_ROUTES.LUTA },
  { nome: "Ciclismo", rota: APP_ROUTES.CICLISMO },
  { nome: "Voleibol", rota: APP_ROUTES.VOLEIBOL },
  { nome: "Basquete", rota: APP_ROUTES.BASQUETE },
  { nome: "Variados", rota: APP_ROUTES.VARIADOS },
  { nome: "Todos", rota: APP_ROUTES.TODOS }
];

const ProductCard = ({ id, nome, preco, imagem }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border p-4 rounded-lg text-center shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/product/${id}`)}
    >
      <img
        src={imagem && imagem.trim() !== "" ? imagem : "/imagemIndisponivel.png"}
        alt={nome}
        className="w-24 h-24 object-contain mx-auto mb-2"
      />
      <h3 className="font-medium">{nome}</h3>
      <p className="text-lg font-bold">R$ {preco.toFixed(2)}</p>
    </div>
  );
};

const Todos = () => {
  const [products, setProducts] = useState([]);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://sportsmaniaback.onrender.com/api/produtos/find/all")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const produtosFiltrados = products.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Navbar />
    <div className="p-8">
      {/* Barra de categorias */}
      <div className="flex flex-row items-center justify-between mb-8">
        <div className="flex-1 flex justify-center">
          <div className="flex flex-row gap-8">
            {categorias.map((cat) => (
              <button
                key={cat.nome}
                onClick={() => navigate(cat.rota)}
                className={`font-medium ${
                  cat.nome === "Todos"
                    ? "border-b-2 border-black"
                    : "text-gray-700"
                } transition pb-1`}
              >
                {cat.nome}
              </button>
            ))}
          </div>
        </div>
        {/* Barra de busca removida daqui */}
      </div>
      {/* Produtos */}
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default Todos;