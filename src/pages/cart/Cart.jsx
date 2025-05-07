import React, { useState } from "react";
import "./cart.css";
import Navbar from "../../components/NavBar";
import { useCart } from "../../context/cartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [zipCode, setZipCode] = useState("");

  const total = cart.items.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <div className="cart-steps">
          <span className="active">1 Carrinho</span>
          <span>2 Identificação</span>
          <span>3 Pagamento</span>
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
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <img src={item.imagem} alt={item.nome} className="cart-img" />
                      {item.nome}
                    </div>
                  </td>
                  <td>{item.quantidade}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                  <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                      }
                      className="text-red-600 font-bold hover:underline"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <div className="total-row grand-total">
            <span>Total da compra</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        <button className="continue-btn">Continuar</button>
      </div>
    </div>
  );
};

export default Cart;
