import React, { useState } from "react";
import './navbar.css';
import Sidebar from './Sidebar';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext1";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState("home");
    const navigate = useNavigate();
    const { totalItems } = useCart(); // Pega o contador de itens

    return (
        <nav className="navbar">
            <div className="left-section">
                <Sidebar />
                <span 
                    className="logo cursor-pointer"
                    onClick={() => {
                        setActiveLink("home");
                        navigate("/homepage");
                    }}
                >
                    <span className="red">Sports</span>
                    <span className="blue">Mania</span>
                </span>
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

                <div className="cart-container" onClick={() => navigate("/cart")}>
                    <FaShoppingCart className="cart-icon cursor-pointer" />
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
