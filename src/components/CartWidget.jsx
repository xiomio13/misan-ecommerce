// src/components/CartWidget.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

function CartWidget() {
  const { totalItems } = useCart();

  return (
    <div className="cart-widget">
      <span className="cart-icon" role="img" aria-label="carrito">
        🛒
      </span>
      {/* Muestra la burbuja numérica únicamente si hay al menos 1 producto */}
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </div>
  );
}

export default CartWidget;
