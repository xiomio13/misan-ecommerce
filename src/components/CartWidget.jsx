import React from "react";

// Componente independiente encargado de mostrar el carrito y su notificación
function CartWidget() {
  return (
    <div className="cart-widget">
      {/* Icono de carrito usando emoji accesible */}
      <span className="cart-icon" role="img" aria-label="carrito">
        🛒
      </span>
      {/* Número de notificación hardcodeado (ej. 3 unidades) */}
      <span className="cart-badge">3</span>
    </div>
  );
}

export default CartWidget;
