import React, { useState } from "react";
import './navbar.css';
import { FaShoppingCart, FaRegHeart, FaUser } from "react-icons/fa";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext_temp";
import logo from "../assets/logo.jpeg";
import { APP_ROUTES } from "../utils/constants";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState("home");
    const [search, setSearch] = useState("");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { totalItems } = useCart();

    return (
        <nav className="navbar" style={{ backgroundColor: "#185cfc", display: "flex", alignItems: "center", padding: "0 32px" }}>
            {/* Logo e Sidebar */}
            <div className="left-section" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                
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

            {/* Barra de pesquisa centralizada */}
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 32px"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#fff",
                    borderRadius: "24px",
                    width: "100%",
                    maxWidth: "600px",
                    boxShadow: "0 1px 6px #0001"
                }}>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="O que você está procurando?"
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            padding: "12px 20px",
                            borderRadius: "24px 0 0 24px",
                            fontSize: "1rem",
                            background: "transparent"
                        }}
                    />
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            borderRadius: "0 24px 24px 0",
                            padding: "0 18px",
                            height: "44px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                        title="Buscar"
                    >
                        <FiSearch size={22} color="#185cfc" />
                    </button>
                </div>
            </div>

            {/* Ícones e menus à direita */}
            <div className="right-section" style={{ display: "flex", alignItems: "center", gap: "32px", position: "relative" }}>
              

                {/* Loja Física */}
                <div
                    style={{ display: "flex", alignItems: "center", color: "#fff", cursor: "pointer", fontWeight: 600 }}
                    onClick={() => navigate("/Adress")}
                >
                    <span>Loja Física</span>
                </div>

                {/* Usuário com menu dropdown */}
                <div
                    style={{ display: "flex", alignItems: "center", color: "#fff", cursor: "pointer", gap: "8px", fontWeight: 600, position: "relative" }}
                    onClick={() => setUserMenuOpen((open) => !open)}
                    tabIndex={0}
                    onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                >
                    <FaUser size={22} />
                    <span>Entrar</span>
                    <FiChevronDown size={18} />
                    {userMenuOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "calc(100% + 10px)",
                                right: 0,
                                background: "#fff",
                                color: "#222",
                                borderRadius: "8px",
                                boxShadow: "0 2px 12px #0002",
                                minWidth: "170px",
                                zIndex: 10,
                                padding: "8px 0"
                            }}
                        >
                            <div
                                style={{ padding: "10px 18px", cursor: "pointer" }}
                                onClick={() => { navigate(APP_ROUTES.SIGN_IN); setUserMenuOpen(false); }}
                                onMouseDown={e => e.preventDefault()}
                            >
                                Login
                            </div>
                            <div
                                style={{ padding: "10px 18px", cursor: "pointer" }}
                                onClick={() => { navigate("/orders"); setUserMenuOpen(false); }}
                                onMouseDown={e => e.preventDefault()}
                            >
                                Meus Pedidos
                            </div>
                            <div
                                style={{ padding: "10px 18px", cursor: "pointer" }}
                                onClick={() => { navigate("/addresses"); setUserMenuOpen(false); }}
                                onMouseDown={e => e.preventDefault()}
                            >
                                Endereços
                            </div>
                        </div>
                    )}
                </div>

                {/* Carrinho */}
                <div className="cart-container" style={{ position: "relative" }} onClick={() => navigate("/cart")}>
                    <FaShoppingCart className="cart-icon cursor-pointer" size={24} color="#fff" />
                    {totalItems > 0 && (
                        <span
                            className="cart-badge"
                            style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                background: "#ff0",
                                color: "#222",
                                borderRadius: "50%",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                                padding: "2px 7px",
                                minWidth: "22px",
                                textAlign: "center",
                                border: "2px solid #185cfc"
                            }}
                        >
                            {totalItems}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
