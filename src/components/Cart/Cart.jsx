import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.css";

function Cart() {
  const { cart, totalPrice, removeItem, clear } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCartContainer}>
        <div className={styles.emptyCartCard}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Explora nuestras colecciones y añade tus polos favoritos.</p>
          <Link to="/" className={styles.btnPrimary}>
            Ir al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Carrito de Compras</h1>

      <div className={styles.cartList}>
        {cart.map((item) => {
          const itemKey = `${item.id}-${item.selectedSize || "std"}`;
          return (
            <div key={itemKey} className={styles.cartCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.img}
                  alt={item.name}
                  className={styles.itemImage}
                />
              </div>

              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.itemMeta}>
                  <span>
                    Talla: <strong>{item.selectedSize || "M"}</strong>
                  </span>
                  <span>
                    Cantidad: <strong>{item.quantity}</strong>
                  </span>
                  <span>
                    Unitario: <strong>S/ {item.price}.00</strong>
                  </span>
                </div>
              </div>

              <div className={styles.itemRightBox}>
                <span className={styles.itemSubtotal}>
                  S/ {item.price * item.quantity}.00
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id, item.selectedSize)}
                className={styles.btnDelete}
                title="Eliminar producto"
                aria-label="Eliminar producto"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.cartFooter}>
        <div className={styles.totalRow}>
          <span>Total a pagar:</span>
          <strong className={styles.totalAmount}>S/ {totalPrice}.00</strong>
        </div>

        <div className={styles.actionsGroup}>
          <button type="button" onClick={clear} className={styles.btnClear}>
            Vaciar Carrito
          </button>
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className={styles.btnCheckout}
          >
            Continuar con el pago
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
