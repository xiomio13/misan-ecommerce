import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <h3>
            Misan<span>.</span>
          </h3>
          <p>
            Especialistas en polos premium para caballero. Diseños atemporales y
            calidad 100% algodón peruano.
          </p>
        </div>

        <div>
          <h4 className={styles.linksTitle}>Categorías</h4>
          <ul className={styles.linksList}>
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

        <div className={styles.infoBlock}>
          <h4 className={styles.infoTitle}>Atención al Cliente</h4>
          <p>Envíos a todo el Perú</p>
          <p>soporte@misan.pe</p>
          <p>Lun - Sáb: 9:00 AM - 7:00 PM</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>
          &copy; {new Date().getFullYear()} Misan E-commerce. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;