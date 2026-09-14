// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

function Navbar() {
  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand-link">
          <h2>Misan<span>.</span></h2>
        </Link>
      </div>

      <nav className="navbar-links">
        <ul>
          <li>
            <NavLink 
              to="/category/clasicos" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Polos Clásicos
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/category/slim-fit" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Polos Slim Fit
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/category/oversize" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Polos Oversize
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/category/pique" 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Polos Piqué
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="navbar-cart">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <CartWidget />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;