// src/components/ItemListContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../mock/asyncMock';
import ItemList from './ItemList';

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Captura el parámetro dinámico /category/:categoryId
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const asyncFunction = categoryId ? getProductsByCategory : getProducts;

    asyncFunction(categoryId)
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error al cargar catálogo:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  const titlesMap = {
    clasicos: 'Polos Clásicos',
    'slim-fit': 'Polos Slim Fit',
    oversize: 'Polos Oversize',
    pique: 'Polos Piqué'
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
            ? 'Explora las opciones disponibles en este estilo.' 
            : 'Colección completa y exclusiva de polos para caballero.'}
        </p>
      </header>

      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      ) : items.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>
          No hay productos disponibles en esta categoría.
        </p>
      ) : (
        <ItemList items={items} />
      )}
    </section>
  );
}

export default ItemListContainer;