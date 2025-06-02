import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";
import Navbar from "../components/NavBar";
import imagemIndisponivel from "../assets/imagemIndisponivel.png";

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

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/produtos/find/all")
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full p-4 mx-auto">
        {/* Banner da página */}
        <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="my-6">
          <SwiperSlide>
            <img
              src={banner}
              alt="Banner"
              className="w-full h-64 object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>

        {/* Lista de produtos */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
