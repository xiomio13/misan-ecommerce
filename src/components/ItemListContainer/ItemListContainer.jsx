import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemList from "../ItemList/ItemList";
import styles from "./ItemListContainer.module.css";

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      setError(null);

      try {
        const productsRef = collection(db, "products");
        const q = categoryId
          ? query(productsRef, where("categorySlug", "==", categoryId))
          : productsRef;

        const snapshot = await getDocs(q);
        const loadedProducts = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setItems(loadedProducts);
      } catch (err) {
        console.error("Error al obtener productos de Firestore:", err);
        setError(
          "Ocurrió un error al cargar los productos. Intenta nuevamente.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [categoryId]);

  const titlesMap = {
    clasicos: "Polos Clásicos",
    "slim-fit": "Polos Slim Fit",
    oversize: "Polos Oversize",
    pique: "Polos Piqué",
  };

  const currentTitle = categoryId
    ? `Categoría: ${titlesMap[categoryId] || categoryId}`
    : greeting;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>{currentTitle}</h1>
        <p className={styles.subtitle}>
          {categoryId
            ? "Explora las opciones disponibles en este estilo."
            : "Colección completa y exclusiva de polos para caballero."}
        </p>
      </header>

      {loading ? (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Cargando productos desde Firestore...</p>
        </div>
      ) : error ? (
        <p className={styles.errorText}>{error}</p>
      ) : items.length === 0 ? (
        <p className={styles.emptyText}>
          No hay productos disponibles en esta categoría.
        </p>
      ) : (
        <ItemList items={items} />
      )}
    </section>
  );
}

export default ItemListContainer;
