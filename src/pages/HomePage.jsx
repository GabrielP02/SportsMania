import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import bola from "../assets/bola.png";
import banner from "../assets/banner.jpg";
import bola_penalty from "../assets/bola_penalty.png";
import luva from "../assets/luva.png";
import joelheira from "../assets/joelheira.jpeg";
import Navbar from "../components/NavBar";


const mockProducts = [
  { name: "Bola jordan colorida", price: "R$540,49", img: bola },
  { name: "Bola penalty branca", price: "R$540,49", img: bola_penalty },
  { name: "Bola", price: "R$36,49", img: bola },
  { name: "Bola 2", price: "R$540,49", img: bola },
  { name: "Joelheira da nike preta", price: "R$540,49", img: joelheira },
  { name: "Luva da nike preta", price: "R$540,49", img: luva },
  { name: "Joelheira da nike preta", price: "R$540,49", img: joelheira },
  { name: "Luva da nike preta", price: "R$65,00", img: luva },
  { name: "Bola jordan colorida", price: "R$540,49", img: bola },
  { name: "Bola penalty branca", price: "R$540,49", img: bola_penalty },
  { name: "Bola", price: "R$36,49", img: bola },
  { name: "Bola 2", price: "R$540,49", img: bola },
  { name: "Joelheira da nike preta", price: "R$540,49", img: joelheira },
  { name: "Luva da nike preta", price: "R$540,49", img: luva },
  { name: "Joelheira da nike preta", price: "R$540,49", img: joelheira },
  { name: "Luva da nike preta", price: "R$65,00", img: luva },
  { name: "Bola jordan colorida", price: "R$540,49", img: bola },
  { name: "Bola penalty branca", price: "R$540,49", img: bola_penalty },
  { name: "Bola", price: "R$36,49", img: bola },
  { name: "Bola 2", price: "R$540,49", img: bola },
  { name: "Joelheira da nike preta", price: "R$540,49", img: joelheira },
  { name: "Luva da nike preta", price: "R$540,49", img: luva },
  { name: "Joelheira da nike preta", price: "R$540,49", img: joelheira },
  { name: "Luva da nike preta", price: "R$65,00", img: luva },
  { name: "Bola jordan colorida", price: "R$540,49", img: bola },
  { name: "Bola penalty branca", price: "R$540,49", img: bola_penalty },
  { name: "Bola", price: "R$36,49", img: bola },
  { name: "Bola 2", price: "R$540,49", img: bola },
  { name: "Joelheira da nike preta", price: "R$540,49", img: joelheira },
  { name: "Luva da nike preta", price: "R$540,49", img: luva },
  { name: "Joelheira da nike preta", price: "R$540,49", img: joelheira },
  { name: "Luva da nike preta", price: "R$65,00", img: luva },
];

const ProductCard = ({ name, price, img }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border p-4 rounded-lg text-center shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/product`)}
    >
      <img src={img} alt={name} className="w-24 mx-auto mb-2" />
      <h3 className="font-medium">{name}</h3>
      <p className="text-lg font-bold">{price}</p>
    </div>
  );
};

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulação de fetch do banco
    // fetch real futuramente
    setProducts(mockProducts);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full p-4 mx-auto">
        <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="my-6">
          <SwiperSlide>
            <img src={banner} alt="Banner" className="w-full h-64 object-cover rounded-lg" />
          </SwiperSlide>
        </Swiper>

        {/* Seção única de produtos */}
        <div className="bg-gray-100 p-4 rounded-lg">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
          <ProductCard key={index} {...product} />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
