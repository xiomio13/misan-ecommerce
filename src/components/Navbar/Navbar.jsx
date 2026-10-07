import React from "react";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { currentUser, logoutUser, logout } = useAuth();
  const handleLogout = logoutUser || logout;

  return (
    <header className={styles.header}>
      <div className={styles.navbarContainer}>
        {/* Logotipo alineado a la izquierda */}
        <div className={styles.brandBox}>
          <Link to="/" className={styles.brandLink}>
            Misan<span className={styles.brandDot}>.</span>
          </Link>
        </div>

        {/* Menú de categorías matemáticamente centrado */}
        <nav className={styles.navMenu}>
          <NavLink
            to="/category/clasicos"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Polos Clásicos
          </NavLink>
          <NavLink
            to="/category/slim-fit"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Polos Slim Fit
          </NavLink>
          <NavLink
            to="/category/oversize"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Polos Oversize
          </NavLink>
          <NavLink
            to="/category/pique"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Polos Piqué
          </NavLink>
        </nav>

        {/* Acciones de la derecha: Login/Logout + Carrito */}
        <div className={styles.actionsBox}>
          {currentUser ? (
            <div className={styles.userProfile}>
              <span className={styles.userEmail}>{currentUser.email}</span>
              <button
                onClick={handleLogout}
                type="button"
                className={styles.btnLogout}
              >
                Salir
              </button>
            </div>
          ) : (
            <Link to="/auth" className={styles.btnLogin}>
              Ingresar
            </Link>
          )}

          <Link to="/cart" className={styles.cartWrapper}>
            <CartWidget />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
