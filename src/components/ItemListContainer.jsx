import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { getProducts } from "../mock/asyncMock";

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setItems(data);
      } catch (error) {
        console.error("Error al cargar el catálogo de productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  return (
    <section className="item-list-container">
      <header className="catalog-header">
        <h1>{greeting}</h1>
        <p className="item-list-subtitle">
          Colección premium de polos para caballero
        </p>
      </header>

      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Cargando catálogo de polos...</p>
        </div>
      ) : (
        <ItemList items={items} />
      )}
    </section>
  );
}

export default ItemListContainer;
