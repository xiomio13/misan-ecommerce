// src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    // 1. Referencia directa al documento por su ID
    const docRef = doc(db, 'products', itemId);

    // 2. Consulta asíncrona del documento
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(`El producto con identificador "${itemId}" no existe.`);
        }
      })
      .catch((err) => {
        console.error('Error al obtener el producto:', err);
        setError('Ocurrió un error al obtener la información del producto.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Cargando detalle del producto desde Firestore...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Lo sentimos</h2>
        <p style={{ color: '#e63946' }}>{error}</p>
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