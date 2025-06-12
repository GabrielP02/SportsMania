import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const MyOrders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clienteId = localStorage.getItem("clienteId");
    fetch(`https://sportsmaniaback.onrender.com/api/pedidos/usuario/${clienteId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          setPedidos([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setPedidos([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-[80vh] flex-col">
        <h1 className="text-2xl font-bold mb-4">Meus Pedidos</h1>
        <p className="text-lg text-gray-600 mb-6">
          Aqui você pode ver todos os seus pedidos anteriores.
        </p>
        {loading ? (
          <p>Carregando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <p>Nenhum pedido encontrado.</p>
        ) : (
          <div className="w-full max-w-2xl">
            <table className="w-full border rounded shadow">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 text-left">Produto</th>
                  <th className="p-2 text-left">Quantidade</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) =>
                  pedido.itens.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2 flex items-center gap-2">
                        <img
                          src={item.produto.imagem}
                          alt={item.produto.nome}
                          style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }}
                        />
                        {item.produto.nome}
                      </td>
                      <td className="p-2">{item.quantidade}</td>
                      <td className="p-2">
                        {pedido.status === "AGUARDANDO_PAGAMENTO" && "Aguardando pagamento"}
                        {pedido.status === "PAGO" && "Pago"}
                        {pedido.status === "PAGAMENTO_REJEITADO" && "Pagamento rejeitado"}
                        {pedido.status === "ENVIADO" && "Enviado"}
                        {pedido.status === "ENTREGUE" && "Entregue"}
                        {!["AGUARDANDO_PAGAMENTO","PAGO","PAGAMENTO_REJEITADO","ENVIADO","ENTREGUE"].includes(pedido.status) && pedido.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;
