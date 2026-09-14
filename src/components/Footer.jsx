// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importación obligatoria de Link

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Misan<span>.</span></h3>
          <p>Especialistas en polos premium para caballero. Diseños atemporales y calidad 100% algodón peruano.</p>
        </div>

        <div className="footer-links">
          <h4>Categorías</h4>
          <ul>
            <li>
              <Link to="/category/clasicos">Polos Clásicos</Link>
            </li>
            <li>
              <Link to="/category/slim-fit">Polos Slim Fit</Link>
            </li>
            <li>
              <Link to="/category/oversize">Polos Oversize</Link>
            </li>
            <li>
              <Link to="/category/pique">Polos Piqué</Link>
            </li>
          </ul>
        </div>

        <div className="footer-info">
          <h4>Atención al Cliente</h4>
          <p>Envíos a todo el Perú</p>
          <p>soporte@misan.pe</p>
          <p>Lun - Sáb: 9:00 AM - 7:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Misan E-commerce. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;