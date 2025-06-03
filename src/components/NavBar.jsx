import React, { useState } from "react";
import './navbar.css';
import Sidebar from './Sidebar';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext_temp";
import logo from "../assets/logo.jpeg"; // Adicione o caminho correto do logo
import { APP_ROUTES } from "../utils/constants";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState("home");
    const navigate = useNavigate();
    const { totalItems } = useCart(); // Pega o contador de itens

    return (
        <nav className="navbar">
            <div className="left-section">
                <Sidebar />
                <img
                    src={logo}
                    alt="Logo Sports Mania"
                    className="logo cursor-pointer"
                    style={{ height: "48px", width: "auto" }}
                    onClick={() => {
                        setActiveLink("home");
                        navigate("/homepage");
                    }}
                />
            </div>

            <div className="right-section">
                <span
                    className={`nav-link ${activeLink === "home" ? "active" : ""}`}
                    onClick={() => {
                        setActiveLink("home");
                        navigate("/homepage");
                    }}
                >
                    HOME
                </span>

                <span
                    className={`nav-link ${activeLink === "contato" ? "active" : ""}`}
                    onClick={() => {
                        setActiveLink("contato");
                        navigate("/Contact");
                    }}
                >
                    CONTATO
                </span>

                <span
                    className="nav-link"
                    onClick={() => navigate(APP_ROUTES.SIGN_IN)}
                    style={{ cursor: "pointer", marginLeft: "24px" }}
                >
                    ENTRAR/CADASTRAR-SE
                </span>

                <div className="cart-container" onClick={() => navigate("/cart")}>
                    <FaShoppingCart className="cart-icon cursor-pointer" />
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
