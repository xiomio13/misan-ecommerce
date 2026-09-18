// src/components/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, removeItem, clear, totalPrice, totalItems } = useCart();

  // 1. Escenario Carrito Vacío
  if (cart.length === 0) {
    return (
      <section className="cart-empty-container">
        <h2>Tu carrito de compras está vacío 🛍️</h2>
        <p>Parece que aún no has seleccionado ningún polo de nuestra colección.</p>
        <Link to="/" className="btn-back-catalog">
          Explorar catálogo
        </Link>
      </section>
    );
  }

  // 2. Escenario Carrito con Productos
  return (
    <section className="cart-view-container">
      <header className="cart-header">
        <h1>Resumen de tu Compra</h1>
        <p className="cart-subtitle">Total de prendas: {totalItems}</p>
      </header>

      <div className="cart-content-grid">
        {/* Lista de productos agregados */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <article key={item.id} className="cart-item-card">
              <img src={item.img} alt={item.name} className="cart-item-thumbnail" />
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                {item.selectedSize && (
                  <p className="cart-item-size">Talla: <strong>{item.selectedSize}</strong></p>
                )}
                <p className="cart-item-unit-price">Precio unitario: S/ {item.price}.00</p>
                <p className="cart-item-qty">Cantidad: {item.quantity}</p>
                <p className="cart-item-subtotal">Subtotal: S/ {item.price * item.quantity}.00</p>
              </div>

              {/* Eliminación individual */}
              <button
                type="button"
                className="btn-remove-item"
                onClick={() => removeItem(item.id)}
                title="Eliminar producto"
                aria-label={`Eliminar ${item.name}`}
              >
                ✕
              </button>
            </article>
          ))}
        </div>

        {/* Panel lateral con el resumen total y acciones */}
        <aside className="cart-summary-card">
          <h2>Total de la Orden</h2>
          
          <div className="summary-breakdown">
            <div className="summary-row">
              <span>Artículos seleccionados:</span>
              <span>{totalItems} u.</span>
            </div>
            <div className="summary-row total-row">
              <span>Total a Pagar:</span>
              <strong>S/ {totalPrice}.00</strong>
            </div>
          </div>

          <div className="cart-actions-group">
            <button
              type="button"
              className="btn-checkout"
              onClick={() => alert('¡Próximamente: Integración de orden con Firebase en el Módulo 7!')}
            >
              Finalizar Compra
            </button>

            <button 
              type="button" 
              className="btn-clear-cart" 
              onClick={clear}
            >
              Vaciar Carrito
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Cart;