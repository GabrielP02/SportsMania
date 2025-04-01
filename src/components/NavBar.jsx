import React from "react";

const Navbar = () => { 
    return (
        <div className="container">
            <nav className="isi">
                <div className="Merek">
                    <div className="nameAwal">Sports</div>
                    <div className="nameAkir">Mania</div>
                </div>
                <ul className="navigasi">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sobre</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </nav>
        </div>
    );
} 

export default Navbar;