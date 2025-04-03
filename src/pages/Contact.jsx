import React, { useState } from "react";
import './Contact.css';
import { APP_ROUTES } from "../utils/constants";


const Contact = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const[telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, email, telefone, mensagem });
  };

  return (
    <div className="container">
      <h2>Contato</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;