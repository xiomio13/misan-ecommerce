import React from 'react';
import CartWidget from './CartWidget';

function Navbar() {
  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <h2>Misan<span>.</span></h2>
      </div>

      <nav className="navbar-links">
        <ul>
          <li><a href="#clasicos">Polos Clásicos</a></li>
          <li><a href="#slim-fit">Polos Slim Fit</a></li>
          <li><a href="#oversize">Polos Oversize</a></li>
          <li><a href="#pique">Polos Piqué</a></li>
        </ul>
      </nav>

      <div className="navbar-cart">
        <CartWidget />
      </div>
    </header>
  );
}

export default Navbar;
