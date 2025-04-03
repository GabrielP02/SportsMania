import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe o hook useNavigate
import Navbar from "../components/NavBar";
import luva from "../assets/luva.png";

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isTrueToSize, setIsTrueToSize] = useState(false);
  const navigate = useNavigate(); // Inicialize o hook

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 font-sans gap-8">
        {/* Div da imagem (direita) - ocupará 40% do espaço em telas médias/grandes */}
        <div className="md:w-2/5 lg:w-2/5 flex justify-center items-start sticky top-6">
          <img 
            src={luva} 
            alt="Luva da Nike Preta" 
            className="w-full max-w-md object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Div principal com informações do produto (esquerda) - ocupará 60% */}
        <div className="md:w-3/5 lg:w-3/5">
          {/* Cabeçalho do produto */}
          <h1 className="text-3xl font-bold mb-2">LUVA DA NIKE PRETA</h1>
          
          {/* Preço */}
          <div className="mb-6">
            <p className="text-2xl font-bold">R$540,49</p>
            <p className="text-gray-600">Ou 10x <span className="font-bold">R$54,04</span> sem juros</p>
            <p className="text-blue-600 text-sm cursor-pointer hover:underline">Ver outras opções</p>
          </div>

          {/* Descrição */}
          <div className="mb-6 border-b pb-6">
            <p className="font-bold mb-2">Respiráveis e feitas parcialmente com materiais reciclados</p>
            <p className="text-gray-700">
              Desenvolvidas para as mãos femininas, estas luvas de treino NIKE oferecem um ajuste elegante 
              e protetor. Leves e elásticas, elas possuem recortes nas costas para permitir que o ar circule. 
              As palmas acolchoadas antiderrapantes oferecem excelente aderência enquanto você levanta os braços.
              Feito com uma série de materiais reciclados e pelo menos 40% de conteúdo reaproveitado, este produto 
              representa apenas uma das nossas soluções para ajudar a eliminar os resíduos plásticos.
            </p>
          </div>

          {/* Tamanhos */}
          <div className="mb-6 border-b pb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Tamanhos</h2>
              <p className="text-blue-600 text-sm cursor-pointer hover:underline">Guia de tamanhos</p>
            </div>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {['2XS','P' , 'M' , 'G','GG'].map(size => (
                <button
                  key={size}
                  className={`py-2 border rounded-md text-center hover:border-black ${
                    selectedSize === size ? 'border-black bg-gray-100' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="trueToSize"
                checked={isTrueToSize}
                onChange={() => setIsTrueToSize(!isTrueToSize)}
                className="mr-2"
              />
              <label htmlFor="trueToSize" className="text-sm">
                <span className="font-bold">Fiel ao tamanho.</span> Recomendamos pedir o tamanho normal.
              </label>
            </div>
          </div>

          {/* Botão de compra modificado */}
          <button 
            className="w-full bg-black text-white py-4 rounded-md font-bold hover:bg-gray-800 transition"
            onClick={() => navigate('/cart')} // Navega para a página do carrinho
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;