import React from "react";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>
            Misan<span>.</span>
          </h3>
          <p>
            Especialistas en polos premium para caballero. Diseños atemporales y
            calidad 100% algodón peruano.
          </p>
        </div>

        <div className="footer-links">
          <h4>Categorías</h4>
          <ul>
            <li>
              <a href="#clasicos">Polos Clásicos</a>
            </li>
            <li>
              <a href="#slim-fit">Polos Slim Fit</a>
            </li>
            <li>
              <a href="#oversize">Polos Oversize</a>
            </li>
            <li>
              <a href="#pique">Polos Piqué</a>
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
        <p>
          &copy; {new Date().getFullYear()} Misan E-commerce. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
