import React, { useState } from "react"; 
import "./cart.css";
import { APP_ROUTES } from "../../utils/constants"
import Navbar from "../../components/NavBar";
import bola_penalty from "../../assets/bola_penalty.png";
import joelheira from "../../assets/joelheira.jpeg";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [zipCode, setZipCode] = useState("");

  return (
    <div>
      <Navbar/>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={bola_penalty} alt="Bola penalty (Branca)" className="cart-img" />
                  Bola penalty (Branca)
                </td>
                <td>1</td>
                <td>R$ 59,90</td>
                <td>R$ 59,90</td>
              </tr>
              <tr>
                <td>
                  <img src={joelheira} alt="Joelheira (Preta)" className="cart-img" />
                  Joelheira (Preta)
                </td>
                <td>1</td>
                <td>R$ 59,90</td>
                <td>R$ 59,90</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Prazo de entrega</h2>
          <div className="shipping">
            <input
              type="text"
              placeholder="Digite seu CEP"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="cep-input"
            />
            <button className="calculate-btn">Calcular</button>
          </div>

          <h2 className="summary-title">Cupom de desconto</h2>
          <div className="discount">
            <input
              type="text"
              placeholder="Digite o cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="coupon-input"
            />
            <button className="apply-btn">Aplicar</button>
          </div>

          <h2 className="summary-title">Resumo</h2>
          <div className="total">
            <div className="total-row">
              <span>Valor dos produtos</span>
              <span>R$ 119,80</span>
            </div>
            <div className="total-row">
              <span>Frete</span>
              <span>R$ 10,00</span>
            </div>
            <div className="total-row">
              <span>Descontos</span>
              <span>R$ 0,00</span>
            </div>
            <div className="total-row grand-total">
              <span>Total da compra</span>
              <span>R$ 119,80</span>
            </div>
          </div>

          <div className="payment-info">
            <p>Nome: 9.08h telma (R$ 10,00)</p>
            <p>Data: 2022/12/16</p>
            <p>Tipo: 1x + OFF</p>
          </div>
        </div>

        <button className="continue-btn">Continuar</button>
      </div>
    </div>
  );
};

export default Cart;