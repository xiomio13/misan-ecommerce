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
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </div>
  );
}

export default CartWidget;