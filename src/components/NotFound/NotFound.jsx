import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <section className={styles.container}>
      <div className={styles.errorCode}>404</div>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.description}>
        Lo sentimos, la prenda o sección que estás buscando no existe o fue movida.
      </p>
      <Link to="/" className={styles.btnHome}>
        Volver a la tienda
      </Link>
    </section>
  );
}

export default NotFound;