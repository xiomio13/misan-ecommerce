// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found-container">
      <span className="not-found-code">404</span>
      <h1 className="not-found-title">Página no encontrada</h1>
      <p className="not-found-text">
        Lo sentimos, la sección o el producto al que intentas acceder no existe o ha sido trasladado.
      </p>
      <Link to="/" className="btn-back-home">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;
