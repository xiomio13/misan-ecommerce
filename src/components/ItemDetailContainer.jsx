// src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { getProductById } from '../mock/asyncMock';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Definimos un ID existente temporal para validar la vista
    // (En la entrega 5 este ID provendrá de la URL con useParams)
    const targetId = 'polo-01';

    setLoading(true);
    setError(null);

    getProductById(targetId)
      .then((res) => {
        setProduct(res);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'No se pudo cargar el producto.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Cargando información del polo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <h2>Producto no disponible</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="item-detail-container">
      {product && <ItemDetail product={product} />}
    </section>
  );
}

export default ItemDetailContainer;
