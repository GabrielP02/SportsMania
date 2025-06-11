import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function StatusPagamento({ pedidoId }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = () => {
      fetch(`https://sportsmaniaback.onrender.com/api/pedidos/${pedidoId}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [pedidoId]);

  if (loading) return <p>Carregando status do pagamento...</p>;

  return (
    <div>
      <h2>Status do Pagamento</h2>
      {status === "AGUARDANDO_PAGAMENTO" && <p>Aguardando pagamento...</p>}
      {status === "PAGO" && (
        <p>Pagamento aprovado! Seu pedido será enviado em breve.</p>
      )}
      {status === "PAGAMENTO_REJEITADO" && (
        <p>Pagamento rejeitado. Tente novamente.</p>
      )}
      {status === "ENVIADO" && <p>Pedido enviado!</p>}
      {status === "ENTREGUE" && <p>Pedido entregue!</p>}
      {![
        "AGUARDANDO_PAGAMENTO",
        "PAGO",
        "PAGAMENTO_REJEITADO",
        "ENVIADO",
        "ENTREGUE",
      ].includes(status) && <p>Status: {status}</p>}
    </div>
  );
}

const MyOrders = () => {
  // Exemplo: substitua pelo id real do pedido do usuário
  const pedidoId = 1;

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center h-[80vh] flex-col">
        <h1 className="text-2xl font-bold">Meus Pedidos</h1>
        <p className="text-lg text-gray-600">
          Aqui você pode ver todos os seus pedidos anteriores.
        </p>
        <StatusPagamento pedidoId={pedidoId} />
      </div>
    </>
  );
};

export default MyOrders;
