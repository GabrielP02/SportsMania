import React, { useState } from "react";
import './navbar.css';
import Sidebar from './Sidebar';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState("home");
    const navigate = useNavigate();

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
                    <span className="red">Sportes</span>
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
                        navigate("/contato"); // ajuste se essa rota existir
                    }}
                >
                    CONTATO
                </span>
                
                <FaShoppingCart 
                    className="cart-icon cursor-pointer" 
                    onClick={() => navigate("/cart")} 
                />
            </div>
        </nav>
    );
};

export default Navbar;
