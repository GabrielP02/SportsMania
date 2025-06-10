import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch(`https://sportsmaniaback.onrender.com/api/produtos/find/id/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Erro ao buscar produto:", error));
  }, [id]);

  // Simulação de múltiplas imagens (adicione mais URLs se houver)
  const images = product?.imagens?.length
    ? product.imagens
    : product
    ? [product.imagem]
    : [];

  const handleAddToCart = async () => {
    const personId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    if (!personId || !token) {
      alert("Faça login para adicionar ao carrinho.");
      return;
    }
    if (!selectedSize) {
      alert("Selecione um tamanho.");
      return;
    }

    try {
      const response = await fetch(
        `https://sportsmaniaback.onrender.com/api/carrinho/person/${personId}/produto/${product.id}?quantidade=${quantity}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.ok) {
        alert("Produto adicionado ao carrinho!");
      } else {
        alert("Erro ao adicionar produto ao carrinho.");
      }
    } catch (error) {
      alert("Erro ao adicionar produto ao carrinho.");
      console.error(error);
    }
  };

  if (!product) {
    return <p>Carregando...</p>;
  }

  // Tamanhos disponíveis (exemplo)
  const tamanhos = ["34", "35", "36", "38", "39", "40", "41", "42", "43"];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-6 font-sans gap-8">
        {/* Galeria de imagens */}
        <div className="md:w-2/5 lg:w-2/5 flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                  aria-label="Anterior"
                >
                  <FaChevronLeft size={22} color="#185cfc" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                  onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                  aria-label="Próximo"
                >
                  <FaChevronRight size={22} color="#185cfc" />
                </button>
              </>
            )}
            <img
              src={images[currentImage]}
              alt={product.nome}
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`border rounded-lg p-1 ${currentImage === idx ? "border-blue-600" : "border-gray-200"}`}
                style={{ background: "#fff" }}
              >
                <img src={img} alt={`Miniatura ${idx + 1}`} className="h-16 w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes do produto */}
        <div className="md:w-3/5 lg:w-3/5">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-2">
            <span className="hover:underline cursor-pointer">Calçados</span> &nbsp;/&nbsp;
            <span className="hover:underline cursor-pointer">{product.categoria || "Categoria"}</span> &nbsp;/&nbsp;
            <span className="font-semibold">{product.nome}</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.nome}</h1>

          <div className="mb-6">
            <p className="text-2xl font-bold text-blue-700">R$ {product.preco.toFixed(2)}</p>
          </div>

          <div className="mb-6 border-b pb-6">
            <p className="text-gray-700">
              {product.descricao || "Descrição do produto não disponível."}
            </p>
          </div>

          {/* Cor do produto */}
          <div className="mb-6">
            <span className="font-semibold">Cor do produto:</span>{" "}
            <span className="inline-block align-middle ml-2 border border-blue-600 rounded p-1">
              <img src={images[0]} alt="Cor" className="h-8 w-8 object-contain" />
            </span>
          </div>

          {/* Tamanhos */}
          <div className="mb-6">
            <span className="font-semibold block mb-2">Tamanho do produto:</span>
            <div className="flex flex-wrap gap-2">
              {tamanhos.map((size) => (
                <button
                  key={size}
                  className={`py-2 px-4 border rounded-md text-center font-semibold transition ${
                    selectedSize === size
                      ? "border-blue-700 bg-blue-100 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-400"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade */}
          <div className="mb-6">
            <label className="block font-bold mb-2">Quantidade</label>
            <input
              type="number"
              min={1}
              max={product.quantidade}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border rounded-md p-2"
            />
            <span className="ml-2 text-gray-500">
              Disponível: {product.quantidade}
            </span>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
