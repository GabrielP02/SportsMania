import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 mt-6">
      <div className="flex justify-center gap-6">
        {/* Facebook */}
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-yellow-500"
        >
          <FaFacebook />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-yellow-500"
        >
          <FaInstagram />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/yourphonenumber"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-yellow-500"
        >
          <FaWhatsapp />
        </a>
      </div>

      <div className="text-center mt-4">
        <p>Endereço: Rua Padre Afonso, 81 - Casa Amarela, Recife-PE</p>
        <p>&copy; 2025 SM_SportsMania. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
