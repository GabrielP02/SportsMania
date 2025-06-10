import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

// Componente para exibir detalhes de um pedido
function PedidoDetalhe({ pedidoId }) {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://sportsmaniaback.onrender.com/api/pedidos/${pedidoId}`)
      .then((res) => res.json())
      .then((data) => {
        setPedido(data);
        setLoading(false);
      });
  }, [pedidoId]);

  if (loading) return <p>Carregando...</p>;
  if (!pedido) return <p>Pedido não encontrado.</p>;

  return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">Itens do Pedido #{pedido.id}</h2>
      <ul className="mb-2">
        {pedido.itens.map((item) => (
          <li key={item.id} className="mb-1">
            Produto: {item.produto.nome} <br />
            Quantidade: {item.quantidade}
          </li>
        ))}
      </ul>
      <p>Status: {pedido.status}</p>
    </div>
  );
}

const MyOrders = () => {
  // Exemplo: pedidoId fixo. Troque pelo id real do pedido do usuário.
  const pedidoId = 1;

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center h-[80vh] flex-col">
        <h1 className="text-2xl font-bold">Meus Pedidos</h1>
        <p className="text-lg text-gray-600">
          Aqui você pode ver todos os seus pedidos anteriores.
        </p>
        {/* Exibe detalhes de um pedido */}
        <PedidoDetalhe pedidoId={pedidoId} />
      </div>
    </>
  );
};

export default MyOrders;
