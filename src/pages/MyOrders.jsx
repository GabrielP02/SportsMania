import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

// Mock para exibição, troque pelo seu fetch real
const MOCK_ORDERS = [
  {
    id: 1,
    status: "nao_enviado", // "nao_enviado", "a_caminho", "entregue"
    dataPedido: "2025-04-10",
    total: 139.99,
    destinatario: "Felipe Ildefonso dos Santos",
    previsao: "2025-04-20",
    entrega: null,
    produtos: [
      {
        nome: "Mochila da nike",
        descricao: "Mochila nike mt foda",
        preco: 139.99,
        imagem: "https://images.tcdn.com.br/img/img_prod/1356490/mochila_nike_nk24_dr6084_preto_branco_42044_1_fc973fa3669c65bc772154fb6bd95689.jpg"
      }
    ]
  },
  {
    id: 2,
    status: "a_caminho",
    dataPedido: "2025-04-12",
    total: 299.90,
    
    previsao: "2025-04-22",
    entrega: null,
    produtos: [
      {
        nome: "Tênis Esportivo Corrida",
        descricao: "Tênis confortável para corrida e caminhada",
        preco: 299.90,
        imagem: "https://andaraki.fbitsstatic.net/img/p/tenis-masculino-esportivo-asics-gel-sparta-2-1011bb15-001-80464/324656.jpg?w=575&h=575&v=no-change&qs=ignore"
      }
    ]
  },
  {
    id: 3,
    status: "entregue",
    dataPedido: "2025-03-28",
    total: 89.90,
    
    previsao: null,
    entrega: "2025-04-01",
    produtos: [
      {
        nome: "Bola de Futebol Oficial",
        descricao: "Bola de futebol tamanho oficial, resistente e durável.",
        preco: 89.90,
        imagem: "https://m.media-amazon.com/images/I/61HzdjSq9pL.__AC_SX300_SY300_QL70_ML2_.jpg"
      }
    ]
  }
];

const STATUS_LABELS = {
  nao_enviado: "Não enviados",
  a_caminho: "A caminho",
  entregue: "Entregues"
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [categoria, setCategoria] = useState("nao_enviado");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    // Troque pelo seu fetch real
    setOrders(MOCK_ORDERS);
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.status === categoria &&
      order.produtos.some((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.descricao.toLowerCase().includes(busca.toLowerCase())
      )
  );

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Seus pedidos</h1>
        {/* Barra de categorias */}
        <div className="flex border-b mb-6 gap-6">
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <button
              key={key}
              className={`pb-2 font-semibold text-lg border-b-4 transition ${
                categoria === key
                  ? "border-blue-700 text-blue-700"
                  : "border-transparent text-gray-600 hover:text-blue-700"
              }`}
              onClick={() => setCategoria(key)}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Barra de pesquisa */}
        <div className="flex items-center gap-2 mb-8">
          <input
            type="text"
            placeholder="Pesquisar todos os pedidos"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            onClick={() => {}} // só filtra ao digitar
          >
            Buscar pedidos
          </button>
        </div>
        {/* Lista de pedidos */}
        {filteredOrders.length === 0 ? (
          <div className="text-gray-500 text-lg text-center py-12">Nenhum pedido encontrado.</div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <span className="text-gray-500 text-sm">
                    <span className="font-semibold">Pedido realizado</span> {new Date(order.dataPedido).toLocaleDateString()}
                  </span>
                  <span className="text-gray-500 text-sm">
                    <span className="font-semibold">Total</span> R$ {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  {/* Status e datas */}
                  {order.status === "nao_enviado" && (
                    <div className="mb-2">
                      <span className="font-bold text-yellow-600">Não enviado</span>
                      <span className="ml-2 text-gray-600 text-sm">
                        | Previsão de envio: {new Date(order.previsao).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {order.status === "a_caminho" && (
                    <div className="mb-2">
                      <span className="font-bold text-blue-700">A caminho</span>
                      <span className="ml-2 text-gray-600 text-sm">
                        | Previsão de entrega: {new Date(order.previsao).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {order.status === "entregue" && (
                    <div className="mb-2">
                      <span className="font-bold text-green-700">Entregue</span>
                      <span className="ml-2 text-gray-600 text-sm">
                        | Entregue em {new Date(order.entrega).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {/* Produtos */}
                  {order.produtos.map((produto, idx) => (
                    <div key={idx} className="flex items-center gap-4 mt-2">
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="w-20 h-20 object-contain rounded-lg border"
                      />
                      <div>
                        <div className="font-semibold text-base">{produto.nome}</div>
                        <div className="text-gray-500 text-sm">{produto.descricao}</div>
                        <div className="text-blue-700 font-bold mt-1">R$ {produto.preco.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyOrders;
