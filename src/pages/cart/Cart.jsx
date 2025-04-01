import React from "react"; 
import "./cart.css";
import { APP_ROUTES } from  "../../utils/constants"
import Navbar from "../../components/NavBar";
import bola_penalty from "../../assets/bola_penalty.png";
import joelheira from "../../assets/joelheira.jpeg";

const Cart = () => {
  return (
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
        <div className="shipping">
          <label>Prazo de entrega:</label>
          <input type="text" placeholder="CEP" />
          <button>Calcular</button>
        </div>
        <div className="discount">
          <label>Cupom de desconto:</label>
          <input type="text" placeholder="OF10" />
          <button>Aplicar</button>
        </div>
        <div className="total">
          <p>Valor dos produtos: <span>R$ 119,80</span></p>
          <p>Frete: <span>R$ 10,00</span></p>
          <p>Descontos: <span>R$ -10,00</span></p>
          <p>Total da compra: <span>R$ 119,80</span></p>
        </div>
      </div>

      <button className="continue-btn">Continuar</button>

    
    </div>
  );
};

export default Cart;