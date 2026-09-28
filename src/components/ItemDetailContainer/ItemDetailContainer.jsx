import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ItemDetail from '../ItemDetail/ItemDetail';
import styles from './ItemDetailContainer.module.css';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, 'products', itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(`El producto con identificador "${itemId}" no existe.`);
        }
      } catch (err) {
        console.error('Error al obtener el producto:', err);
        setError('Ocurrió un error al obtener la información del producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Cargando detalle del producto desde Firestore...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorBox}>
        <h2 className={styles.errorTitle}>Lo sentimos</h2>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      {product && <ItemDetail product={product} />}
    </section>
  );
}

export default ItemDetailContainer;