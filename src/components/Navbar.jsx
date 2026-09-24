// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CartWidget from "./CartWidget";

function Navbar() {
  const { currentUser, logoutUser } = useAuth();

  return (
    <header className="navbar-container">
      {/* 1. Logotipo de la marca */}
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand-link">
          <h2>
            Misan<span>.</span>
          </h2>
        </Link>
      </div>

      {/* 2. Menú de categorías */}
      <nav className="navbar-links">
        <ul>
          <li>
            <NavLink
              to="/category/clasicos"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Polos Clásicos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/slim-fit"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Polos Slim Fit
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/oversize"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Polos Oversize
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/pique"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Polos Piqué
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 3. Panel de usuario y Carrito unificados en tamaño */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {currentUser ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                color: "#f1faee",
                fontSize: "0.88rem",
                fontWeight: "500",
              }}
            >
              {currentUser.email}
            </span>
            <button
              onClick={logoutUser}
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.45rem 1rem",
                backgroundColor: "rgba(230, 57, 70, 0.15)",
                border: "1px solid #e63946",
                borderRadius: "20px",
                color: "#e63946",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                height: "36px",
                boxSizing: "border-box",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e63946";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(230, 57, 70, 0.15)";
                e.currentTarget.style.color = "#e63946";
              }}
            >
              Salir
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.45rem 1.2rem",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "20px",
              color: "#f1faee",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "600",
              height: "36px",
              boxSizing: "border-box",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
          >
            Ingresar
          </Link>
        )}

        <div className="navbar-cart">
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <CartWidget />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
