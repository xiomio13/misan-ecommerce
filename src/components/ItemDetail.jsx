// src/components/ItemDetail.jsx
import React, { useState } from 'react';
import ItemCount from './ItemCount';

function ItemDetail({ product }) {
  const { name, img, price, category, description, stock, material, fit, sizes, sku } = product;

  // Estado para la talla seleccionada (inicia con la primera talla disponible)
  const [selectedSize, setSelectedSize] = useState(sizes && sizes.length > 0 ? sizes[0] : null);

  const handleAddToCart = (quantity) => {
    console.log(`Se agregaron ${quantity} unidades de "${name}" (Talla: ${selectedSize}) al carrito.`);
  };

  return (
    <article className="item-detail-layout">
      {/* Columna Izquierda: Imagen Principal */}
      <div className="item-detail-media">
        <img src={img} alt={name} className="item-detail-image" />
        <span className="item-detail-badge">{category}</span>
      </div>

      {/* Columna Derecha: Información Extendida y Compra */}
      <div className="item-detail-info">
        <span className="item-detail-sku">SKU: {sku}</span>
        <h1 className="item-detail-title">{name}</h1>
        <p className="item-detail-price">S/ {price}.00</p>

        <div className="item-detail-description">
          <h3>Descripción del Producto</h3>
          <p>{description}</p>
        </div>

        {/* Ficha técnica */}
        <div className="item-detail-specs">
          <div className="spec-row">
            <span className="spec-label">Composición:</span>
            <span className="spec-value">{material}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Tipo de Calce:</span>
            <span className="spec-value">{fit}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Disponibilidad:</span>
            <span className="spec-value">{stock} unidades en almacén</span>
          </div>
        </div>

        {/* Selector de tallas interactivo */}
        <div className="item-detail-sizes">
          <h4>
            Talla seleccionada: <strong>{selectedSize}</strong>
          </h4>
          <div className="size-pill-container">
            {sizes?.map((size) => (
              <button
                key={size}
                type="button"
                className={`size-pill-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Componente ItemCount */}
        <div className="item-detail-actions">
          <ItemCount stock={stock} initial={1} onAdd={handleAddToCart} />
        </div>
      </div>
    </article>
  );
}

export default ItemDetail;