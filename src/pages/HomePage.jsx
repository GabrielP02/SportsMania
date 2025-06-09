import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import imagemIndisponivel from "../assets/imagemIndisponivel.png";
import { APP_ROUTES } from "../utils/constants";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";


const ProductCard = ({ id, nome, preco, imagem }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border p-4 rounded-lg text-center shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/product/${id}`)}
    >
      <img
        src={imagem && imagem.trim() !== "" ? imagem : imagemIndisponivel}
        alt={nome}
        className="w-24 h-24 object-contain mx-auto mb-2"
      />
      <h3 className="font-medium">{nome}</h3>
      <p className="text-lg font-bold">R$ {preco.toFixed(2)}</p>
    </div>
  );
};

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

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://sportsmaniaback.onrender.com/api/produtos/find/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("Resposta da API não é uma lista.");
        }
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  // Filtragem por busca e categoria
  const produtosFiltrados = products.filter((produto) => {
    const nomeMatch = produto.nome.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch =
      categoriaSelecionada === "Todos" ||
      (produto.categoria &&
        produto.categoria.toLowerCase() === categoriaSelecionada.toLowerCase());
    return nomeMatch && categoriaMatch;
  });

  return (
    <div className="min-h-screen">
      <Navbar/>
      
      <div className="w-full p-4 mx-auto">
        {/* Categorias */}
        <div className="flex flex-row items-center justify-between mb-8">
          <div className="flex-1 flex justify-center">
            <div className="flex flex-row gap-8">
              {categorias.map((cat) => (
                <button
                  key={cat.nome}
                  onClick={() => navigate(cat.rota)}
                  className={`font-medium ${
                    categoriaSelecionada === cat.nome
                      ? "border-b-2 border-black"
                      : "text-gray-700"
                  } transition pb-1`}
                >
                  {cat.nome}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Carrossel de imagens */}
        <div className="mb-8 flex justify-center bg-[#f5f5f5]">
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="overflow-hidden"
            style={{
              width: "2000px", // largura ajustada
              height: "900px", // altura ajustada
              borderRadius: "0px"
            }}
          >
            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src={banner1}
                  alt="Banner 1"
                  className="w-full h-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                />
                {/* Mensagem lateral */}
                <div
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-white"
                  style={{
                    maxWidth: "400px",
                    background: "rgba(0,0,0,0.35)",
                    padding: "32px 32px 32px 32px",
                    borderRadius: "12px"
                  }}
                >
                  <h2 className="text-4xl font-bold mb-4">Pratique seu esporte favorito com a gente</h2>
                  <div className="h-1 w-24 bg-red-600 mb-4"></div>

                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition"
                    onClick={() => navigate(APP_ROUTES.TODOS)}
                  >
                    COMPRE AGORA
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-full">
                <img
                  src={banner2}
                  alt="Banner 2"
                  className="w-full h-full object-cover"
                  style={{ width: "100%", height: "100%" }}
                />
                {/* Mensagem lateral para o banner 2 */}
                <div
                  className="absolute left-12 top-1/2 -translate-y-1/2 text-white"
                  style={{
                    maxWidth: "400px",
                    background: "rgba(0,0,0,0.35)",
                    padding: "32px 32px 32px 32px",
                    borderRadius: "12px"
                  }}
                >
                  <h2 className="text-4xl font-bold mb-4">Encontre os melhores produtos esportivos</h2>
                  <div className="h-1 w-24 bg-red-600 mb-4"></div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition"
                    onClick={() => navigate(APP_ROUTES.TODOS)}
                  >
                    VER PRODUTOS
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

       
      </div>
    </div>
  );
};

export default HomePage;
