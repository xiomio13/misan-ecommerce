// src/components/ItemListContainer.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemList from "./ItemList";

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    // 1. Referencia a la colección 'products' en Firestore
    const productsRef = collection(db, "products");

    // 2. Filtrado condicional: si hay categoría en la URL usamos query + where
    const q = categoryId
      ? query(productsRef, where("categorySlug", "==", categoryId))
      : productsRef;

    // 3. Consulta asíncrona a Firestore
    getDocs(q)
      .then((snapshot) => {
        const loadedProducts = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setItems(loadedProducts);
      })
      .catch((err) => {
        console.error("Error al obtener productos de Firestore:", err);
        setError(
          "Ocurrió un error al cargar los productos. Intenta nuevamente.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
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
    <section className="item-list-container">
      <header className="catalog-header">
        <h1>{currentTitle}</h1>
        <p className="item-list-subtitle">
          {categoryId
            ? "Explora las opciones disponibles en este estilo."
            : "Colección completa y exclusiva de polos para caballero."}
        </p>
      </header>

      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Cargando productos desde Firestore...</p>
        </div>
      ) : error ? (
        <p style={{ textAlign: "center", color: "#e63946", padding: "2rem" }}>
          {error}
        </p>
      ) : items.length === 0 ? (
        <p style={{ textAlign: "center", padding: "2rem" }}>
          No hay productos disponibles en esta categoría.
        </p>
      ) : (
        <ItemList items={items} />
      )}
    </section>
  );
}

export default ItemListContainer;
