// src/components/ItemDetail.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';

function ItemDetail({ product }) {
  const { name, img, price, category, description, stock, material, fit, sizes, sku } = product;

  // Estado para la talla seleccionada
  const [selectedSize, setSelectedSize] = useState(sizes && sizes.length > 0 ? sizes[0] : null);

  // Estado local para alternar contador vs botón de terminar compra
  const [addedQuantity, setAddedQuantity] = useState(0);

  // Reiniciar estado al cambiar de polo
  useEffect(() => {
    setAddedQuantity(0);
    if (sizes && sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [product.id]);

  // Consumimos el contexto global
  const { addItem } = useCart();

  const handleAddToCart = (quantity) => {
    setAddedQuantity(quantity);
    addItem({ ...product, selectedSize }, quantity);
  };

  return (
    <article className="item-detail-layout">
      {/* Columna Izquierda: Imagen */}
      <div className="item-detail-media">
        <img src={img} alt={name} className="item-detail-image" />
        <span className="item-detail-badge">{category}</span>
      </div>

      {/* Columna Derecha: Información y Acciones */}
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

        {/* Selector de tallas */}
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

        {/* Renderizado condicional */}
        <div className="item-detail-actions">
          {addedQuantity > 0 ? (
            <div className="checkout-cta-box">
              <p className="item-added-alert">
                ✓ ¡Agregaste {addedQuantity} unidad(es) de talla <strong>{selectedSize}</strong> al carrito!
              </p>
              <div className="cta-buttons-group">
                <Link to="/cart" className="btn-go-cart">
                  Terminar mi compra
                </Link>
                <Link to="/" className="btn-keep-buying">
                  Seguir comprando
                </Link>
              </div>
            </div>
          ) : (
            <ItemCount stock={stock} initial={1} onAdd={handleAddToCart} />
          )}
        </div>
      </div>
    </article>
  );
}

export default ItemDetail;