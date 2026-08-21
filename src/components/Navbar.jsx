import React from "react";
import CartWidget from "./CartWidget"; // Importamos el componente hijo independiente

function Navbar() {
  return (
    <header className="navbar-container">
      {/* Logo / Nombre de la tienda */}
      <div className="navbar-logo">
        <h2>
          Misan<span>.</span>
        </h2>
      </div>

      {/* Categorías exclusivas de productos de la tienda */}
      <nav className="navbar-links">
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
      </nav>

      {/* Renderizado del componente CartWidget */}
      <div className="navbar-cart">
        <CartWidget />
      </div>
    </header>
  );
}

export default Navbar;
