import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CartWidget from '../CartWidget/CartWidget';
import styles from './Navbar.module.css';

function Navbar() {
  const { currentUser, logoutUser } = useAuth();

  return (
    <header className={styles.navbarContainer}>
      <div className={styles.logoBox}>
        <Link to="/" className={styles.logoLink}>
          <h2 className={styles.logoTitle}>
            Misan<span className={styles.logoDot}>.</span>
          </h2>
        </Link>
      </div>

      <nav className={styles.navMenu}>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/category/clasicos"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
              }
            >
              Polos Clásicos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/slim-fit"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
              }
            >
              Polos Slim Fit
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/oversize"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
              }
            >
              Polos Oversize
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/pique"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
              }
            >
              Polos Piqué
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.userSection}>
        {currentUser ? (
          <div className={styles.userInfo}>
            <span>{currentUser.email}</span>
            <button onClick={logoutUser} type="button" className={styles.btnLogout}>
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
    </header>
  );
}

export default Navbar;