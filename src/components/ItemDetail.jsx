// src/components/ItemDetail.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ItemCount from "./ItemCount";

function ItemDetail({ product }) {
  const {
    name,
    img,
    price,
    category,
    description,
    stock,
    material,
    fit,
    sizes,
    sku,
  } = product;

  // Estado para la talla seleccionada (inicia con la primera disponible)
  const [selectedSize, setSelectedSize] = useState(
    sizes && sizes.length > 0 ? sizes[0] : null,
  );

  // Estado local para alternar la vista una vez que se agregan productos
  const [addedQuantity, setAddedQuantity] = useState(0);

  // Extraemos la función global de agregar al carrito
  const { addItem } = useCart();

  const handleAddToCart = (quantity) => {
    setAddedQuantity(quantity);
    // Agregamos al contexto el producto con la talla elegida y la cantidad
    addItem({ ...product, selectedSize }, quantity);
  };

  return (
    <article className="item-detail-layout">
      {/* Columna Izquierda: Imagen Principal */}
      <div className="item-detail-media">
        <img src={img} alt={name} className="item-detail-image" />
        <span className="item-detail-badge">{category}</span>
      </div>

      {/* Columna Derecha: Información Técnica y Acciones de Compra */}
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

        {/* Selector interactivo de tallas */}
        <div className="item-detail-sizes">
          <h4>
            Talla seleccionada: <strong>{selectedSize}</strong>
          </h4>
          <div className="size-pill-container">
            {sizes?.map((size) => (
              <button
                key={size}
                type="button"
                className={`size-pill-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Renderizado condicional: Contador vs Botones de Compra */}
        <div className="item-detail-actions">
          {addedQuantity > 0 ? (
            <div className="checkout-cta-box">
              <p className="item-added-alert">
                ✓ ¡Agregaste {addedQuantity} unidad(es) de talla{" "}
                <strong>{selectedSize}</strong> al carrito!
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
