import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Navbar from "../../components/NavBar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [frete, setFrete] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [endereco, setEndereco] = useState(null);

  const clienteId = localStorage.getItem("clienteId");
  const navigate = useNavigate();

  // Buscar endereço do usuário
  useEffect(() => {
    if (!clienteId) return;
    const token = localStorage.getItem("token");
    fetch(`https://sportsmaniaback.onrender.com/api/persons/${clienteId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) setEndereco(data);
      });
  }, [clienteId]);

  // Buscar itens do carrinho
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
        setCartItems(data.itens || data.produtos || data.items || []);
        let sum = 0;
        (data.itens || data.produtos || data.items || []).forEach(
          (item) => (sum += (item.produto.preco || 0) * (item.quantidade || 1))
        );
        setTotal(sum);
      })
      .catch((err) => {
        console.error(err);
        setCartItems([]);
        setTotal(0);
      });
  }, [clienteId]);

  // Calcular frete automaticamente quando endereço e carrinho estiverem prontos
  useEffect(() => {
    if (endereco && endereco.cep && cartItems.length > 0) {
      handleCalcularFrete(endereco.cep);
    }
    // eslint-disable-next-line
  }, [endereco, cartItems]);

  const handleCalcularFrete = async (cepDestino) => {
    setCalculandoFrete(true);
    try {
      const payload = {
        from: { postal_code: "52070-210" },
        to: { postal_code: cepDestino },
        products: cartItems.map(item => ({
          weight: 0.8,
          width: 25,
          height: 12,
          length: 30,
          quantity: item.quantidade
        })),
        services: ["1", "2"]
      };
      const response = await fetch("https://sportsmaniaback.onrender.com/calcular-frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const resultado = await response.json();
        setFrete(resultado);
        setServicoSelecionado(null);
      } else {
        setFrete([]);
        setServicoSelecionado(null);
        alert("Erro ao calcular frete.");
      }
    } catch (error) {
      setFrete([]);
      setServicoSelecionado(null);
      alert("Erro ao calcular frete.");
      console.error(error);
    }
    setCalculandoFrete(false);
  };

  const precoTotal = useMemo(() => {
    if (servicoSelecionado) {
      return total + Number(servicoSelecionado.price);
    }
    return total;
  }, [total, servicoSelecionado]);

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
          body: JSON.stringify({
            frete: servicoSelecionado
              ? {
                  id: servicoSelecionado.id,
                  name: servicoSelecionado.name,
                  price: Number(servicoSelecionado.price),
                  delivery_time: servicoSelecionado.delivery_time,
                }
              : null,
          }),
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
          body: JSON.stringify({ quantidade: 1 })
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
          setCartItems(data.itens || data.produtos || data.items || []);
          let sum = 0;
          (data.itens || data.produtos || data.items || []).forEach(
            (item) => (sum += (item.produto.preco || 0) * (item.quantidade || 1))
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
        {/* Endereço do usuário */}
        <div className="bg-gray-100 p-4 rounded mb-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold mb-1">Endereço de entrega:</h2>
            {endereco ? (
              <div>
                <div>{endereco.rua}, {endereco.numero} {endereco.complemento && `- ${endereco.complemento}`}</div>
                <div>{endereco.bairro} - {endereco.cidade}/{endereco.uf}</div>
                <div>CEP: {endereco.cep}</div>
              </div>
            ) : (
              <span>Carregando endereço...</span>
            )}
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
            onClick={() => navigate("/addressUpdate")}
          >
            Atualizar endereço
          </button>
        </div>

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
                  <tr key={item.produto.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <img src={item.produto.imagem} alt={item.produto.nome} className="cart-img" />
                        {item.produto.nome}
                      </div>
                    </td>
                    <td>{item.quantidade}</td>
                    <td>R$ {(item.produto.preco || 0).toFixed(2)}</td>
                    <td>R$ {((item.produto.preco || 0) * (item.quantidade || 1)).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(item.produto.id)}
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

        {/* Opções de frete para o usuário escolher */}
        <div className="cart-frete">
          <label className="block mb-2 font-bold">Frete para o CEP: {endereco?.cep || "..."}</label>
          {calculandoFrete && <div>Calculando frete...</div>}
          {frete && Array.isArray(frete) && frete.length > 0 && (
            <div className="mt-2">
              <label className="block font-bold mb-1">Escolha o serviço de entrega:</label>
              {frete
                .filter(
                  opcao =>
                    (opcao.id === "1" || opcao.id === "2" || opcao.id === 1 || opcao.id === 2) &&
                    opcao.price &&
                    !isNaN(Number(opcao.price))
                )
                .map((opcao, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="servico-frete"
                      value={opcao.id}
                      checked={servicoSelecionado && servicoSelecionado.id === opcao.id}
                      onChange={() => setServicoSelecionado(opcao)}
                    />
                    <span>
                      {opcao.name} - R$ {Number(opcao.price).toFixed(2)} ({opcao.delivery_time} dias úteis)
                    </span>
                  </div>
                ))}
              {/* Mensagem caso nenhuma opção válida */}
              {frete.filter(
                opcao =>
                  (opcao.id === "1" || opcao.id === "2" || opcao.id === 1 || opcao.id === 2) &&
                  opcao.price &&
                  !isNaN(Number(opcao.price))
              ).length === 0 && (
                <div className="text-red-600 font-bold mt-2">
                  Nenhuma opção de frete disponível para o CEP informado.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="cart-summary">
          <div className="total-row">
            <span>Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Frete</span>
            <span>
              {servicoSelecionado
                ? `R$ ${Number(servicoSelecionado.price).toFixed(2)}`
                : "--"}
            </span>
          </div>
          <div className="total-row grand-total">
            <span>Total da compra</span>
            <span>R$ {precoTotal.toFixed(2)}</span>
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
