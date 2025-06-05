import React, { useState, useEffect } from "react";
import "./Cart.css";
import Navbar from "../../components/NavBar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const clienteId = localStorage.getItem("clienteId");

  useEffect(() => {
    if (!clienteId) {
      alert("Faça login para visualizar o carrinho.");
      return;
    }
    const token = localStorage.getItem("token");
    fetch(`https://sportsmaniaback.onrender.com/api/carrinho/person/${clienteId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar carrinho");
        return res.json();
      })
      .then((data) => {
        // Ajuste conforme a estrutura do seu DTO de resposta
        setCartItems(data.produtos || data.items || []);
        // Calcule o total
        let sum = 0;
        (data.produtos || data.items || []).forEach(
          (item) => (sum += (item.preco || 0) * (item.quantidade || 1))
        );
        setTotal(sum);
      })
      .catch((err) => {
        console.error(err);
        setCartItems([]);
        setTotal(0);
      });
  }, [clienteId]);

  const handlePagamento = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://sportsmaniaback.onrender.com/api/pagamento/carrinho/${clienteId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.ok) {
      const data = await response.json();
      const url = data.init_point;
      if (url && url.startsWith("http")) {
         window.location.href = url;
      } else {
      alert("URL de pagamento não recebida.");
      }
      } else {
        alert("Erro ao iniciar pagamento.");
      }
    } catch (error) {
      alert("Erro ao iniciar pagamento.");
      console.error(error);
    }
  };

  const handleRemoveItem = async (produtoId) => {
    const clienteId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://sportsmaniaback.onrender.com/api/carrinho/person/${clienteId}/remover?produtoId=${produtoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ quantidade: 1 }),
        }
      );
      if (response.ok) {
        // Recarregue o carrinho do backend para garantir atualização
        const res = await fetch(
          `https://sportsmaniaback.onrender.com/api/carrinho/person/${clienteId}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.produtos || data.items || []);
          let sum = 0;
          (data.produtos || data.items || []).forEach(
            (item) => (sum += (item.preco || 0) * (item.quantidade || 1))
          );
          setTotal(sum);
        }
      } else {
        alert("Erro ao remover produto do carrinho.");
      }
    } catch (error) {
      alert("Erro ao remover produto do carrinho.");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <div className="cart-content">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produtos</th>
                <th>Quantidade</th>
                <th>Valor unitário</th>
                <th>Valor total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={item.imagem}
                          alt={item.nome}
                          className="cart-img"
                        />
                        {item.nome}
                      </div>
                    </td>
                    <td>{item.quantidade}</td>
                    <td>R$ {item.preco.toFixed(2)}</td>
                    <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 font-bold hover:underline"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500">
                    Carrinho vazio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <div className="total-row grand-total">
            <span>Total da compra</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="continue-btn"
          onClick={handlePagamento}
          disabled={cartItems.length === 0}
        >
          Pagar com Mercado Pago
        </button>
      </div>
    </div>
  );
};

export default Cart;
