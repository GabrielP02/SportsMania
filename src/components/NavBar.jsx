import React, { useState } from "react";
import './navbar.css';
import Sidebar from './Sidebar';
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState("home"); // Define 'home' como padrão

    return (
        <nav className="navbar">
            <div className="left-section">
                <Sidebar />
                <span className="logo">
                    <span className="red">Sportes</span>
                    <span className="blue">Mania</span>
                </span>
            </div>
            <div className="right-section">
                <a 
                    href="/homepage"
                    className={`nav-link ${activeLink === "home" ? "active" : ""}`} 
                    onClick={() => setActiveLink("home")}
                >
                    HOME
                </a>
                <a 
                    href="#" 
                    className={`nav-link ${activeLink === "contato" ? "active" : ""}`} 
                    onClick={() => setActiveLink("contato")}
                >
                    CONTATO
                </a>
                <FaShoppingCart className="cart-icon" />
            </div>
        </nav>
    );
};

export default Navbar;
