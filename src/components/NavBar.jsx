import React, { useState } from "react";
import './navbar.css';
import Sidebar from './Sidebar';
import '../utils/constants';

const Navbar = () => { 
    const [active, setActive] = useState("home");

    return (
        <div className="container">
            <Sidebar/>
            <nav className="list">
                <div className="Merak">
                    <div className="manaMail">Sports</div>
                    <div className="manaAblitr">Mania</div>
                </div>
                <ul className="navigast">
                    <li 
                        className={active === "home" ? "active" : ""}
                        onClick={() => setActive("home")}
                    >
                        <a href="/homepage">Home</a>
                    </li>
                    <li 
                        className={active === "sobre" ? "active" : ""}
                        onClick={() => setActive("sobre")}
                    >
                        <a href="#">Sobre</a>
                    </li>
                    <li 
                        className={active === "contato" ? "active" : ""}
                        onClick={() => setActive("contato")}
                    >
                        <a href="#">Contato</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
} 

export default Navbar;
