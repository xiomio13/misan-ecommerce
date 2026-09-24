// src/components/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeItem, clear, totalPrice, totalItems } = useCart();

  // 1. Escenario: Carrito Vacío
  if (cart.length === 0) {
    return (
      <section
        className="cart-empty-container"
        style={{ textAlign: "center", padding: "3.5rem 1rem" }}
      >
        <h2>Tu carrito de compras está vacío 🛍️</h2>
        <p style={{ color: "#6c757d", margin: "1rem 0 2rem" }}>
          Parece que aún no has elegido ningún polo de nuestra colección.
        </p>
        <Link
          to="/"
          style={{
            padding: "0.85rem 1.8rem",
            background: "#1d3557",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          Explorar catálogo
        </Link>
      </section>
    );
  }

  // 2. Escenario: Carrito con Productos
  return (
    <section
      className="cart-view-container"
      style={{ maxWidth: "950px", margin: "2.5rem auto", padding: "0 1rem" }}
    >
      <header style={{ marginBottom: "1.8rem" }}>
        <h1 style={{ color: "#1d3557", margin: "0 0 0.3rem 0" }}>
          Resumen de tu Compra
        </h1>
        <p style={{ color: "#6c757d", margin: 0 }}>
          Total de prendas: {totalItems}
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Lista de productos agregados */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cart.map((item) => {
            // Clave única compuesta para evitar advertencias de React si se compran distintas tallas del mismo polo
            const itemKey = `${item.id}-${item.selectedSize || "std"}`;

            return (
              <article
                key={itemKey}
                style={{
                  display: "flex",
                  gap: "1.2rem",
                  alignItems: "center",
                  background: "#fff",
                  padding: "1.2rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  position: "relative",
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "85px",
                    height: "85px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    backgroundColor: "#f1f3f5",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      color: "#1d3557",
                      margin: "0 0 0.35rem 0",
                    }}
                  >
                    {item.name}
                  </h3>

                  {item.selectedSize && (
                    <p
                      style={{
                        margin: "0 0 0.25rem 0",
                        fontSize: "0.85rem",
                        color: "#6c757d",
                      }}
                    >
                      Talla:{" "}
                      <strong style={{ color: "#1d3557" }}>
                        {item.selectedSize}
                      </strong>
                    </p>
                  )}

                  <p
                    style={{
                      margin: "0 0 0.25rem 0",
                      fontSize: "0.85rem",
                      color: "#495057",
                    }}
                  >
                    Precio unitario: S/ {item.price}.00
                  </p>

                  <p
                    style={{
                      margin: "0 0 0.35rem 0",
                      fontSize: "0.85rem",
                      color: "#495057",
                    }}
                  >
                    Cantidad: {item.quantity}
                  </p>

                  <strong style={{ color: "#e63946", fontSize: "0.95rem" }}>
                    Subtotal: S/ {item.price * item.quantity}.00
                  </strong>
                </div>

                {/* Botón para remover el ítem */}
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  title="Eliminar producto"
                  aria-label={`Eliminar ${item.name}`}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "none",
                    border: "none",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    color: "#adb5bd",
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#e63946")}
                  onMouseOut={(e) => (e.target.style.color = "#adb5bd")}
                >
                  ✕
                </button>
              </article>
            );
          })}
        </div>

        {/* Panel lateral con totales y navegación hacia Checkout */}
        <aside
          style={{
            background: "#fff",
            padding: "1.8rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              color: "#1d3557",
              margin: "0 0 1.2rem 0",
            }}
          >
            Total de la Orden
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
              borderTop: "1px solid #e9ecef",
              paddingTop: "1rem",
            }}
          >
            <span style={{ color: "#495057", fontSize: "1rem" }}>
              Total a Pagar:
            </span>
            <strong style={{ fontSize: "1.5rem", color: "#e63946" }}>
              S/ {totalPrice}.00
            </strong>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            <Link
              to="/checkout"
              style={{
                display: "block",
                textAlign: "center",
                padding: "0.85rem",
                background: "#2a9d8f",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "background 0.2s ease",
              }}
            >
              Continuar con el pago
            </Link>

            <button
              type="button"
              onClick={clear}
              style={{
                padding: "0.7rem",
                background: "transparent",
                border: "1px solid #ced4da",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#6c757d",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = "#e63946";
                e.target.style.color = "#e63946";
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = "#ced4da";
                e.target.style.color = "#6c757d";
              }}
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
