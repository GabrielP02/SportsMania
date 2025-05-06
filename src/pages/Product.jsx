import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";


const ProductPage = () => {
  const { id } = useParams(); // Captura o ID do produto da URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Busca os detalhes do produto pelo ID
    fetch(`http://localhost:8080/api/produtos/find/id/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data); // Atualiza o estado com os detalhes do produto
      })
      .catch((error) => console.error("Erro ao buscar produto:", error));
  }, [id]);

  if (!product) {
    return <p>Carregando...</p>; // Exibe um carregamento enquanto os dados são buscados
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 font-sans gap-8">
        {/* Div da imagem (direita) */}
        <div className="md:w-2/5 lg:w-2/5 flex justify-center items-start sticky top-6">
          <img
            src={product.imagem}
            alt={product.nome}
            className="w-full max-w-md object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Div principal com informações do produto (esquerda) */}
        <div className="md:w-3/5 lg:w-3/5">
          {/* Nome do produto vindo do backend */}
          <h1 className="text-3xl font-bold mb-2">{product.nome}</h1>

          {/* Preço vindo do backend */}
          <div className="mb-6">
            <p className="text-2xl font-bold">R$ {product.preco.toFixed(2)}</p>
            <p className="text-gray-600">
              Ou 10x <span className="font-bold">R$ {(product.preco / 10).toFixed(2)}</span> sem juros
            </p>
            <p className="text-blue-600 text-sm cursor-pointer hover:underline">Ver outras opções</p>
          </div>

          {/* Descrição fixa */}
          <div className="mb-6 border-b pb-6">
            <p className="text-gray-700">
              {product.descricao || "Descrição do produto não disponível."}
            </p>
          </div>

          {/* Tamanhos */}
          <div className="mb-6 border-b pb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Tamanhos</h2>
              <p className="text-blue-600 text-sm cursor-pointer hover:underline">Guia de tamanhos</p>
            </div>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {['2XS', 'P', 'M', 'G', 'GG'].map((size) => (
                <button
                  key={size}
                  className="py-2 border rounded-md text-center hover:border-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botão de compra */}
          <button
            className="w-full bg-black text-white py-4 rounded-md font-bold hover:bg-gray-800 transition"
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;