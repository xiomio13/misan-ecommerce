// src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../mock/asyncMock";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Captura dinámica del ID desde la URL (/item/:itemId)
  const { itemId } = useParams();

  useEffect(() => {
    // Si no hay parámetro en la URL, toma 'polo-01' por defecto
    const idToSearch = itemId || "polo-01";

    setLoading(true);
    setError(null);

    getProductById(idToSearch)
      .then((res) => {
        setProduct(res);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "No se pudo cargar el producto.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

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
