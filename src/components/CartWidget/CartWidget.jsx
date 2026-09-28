import React from "react";
import { useCart } from "../../context/CartContext";
import styles from "./CartWidget.module.css";

function CartWidget() {
  const { totalItems } = useCart();

  return (
    <div className={styles.cartWidget}>
      <span className={styles.cartIcon} role="img" aria-label="carrito">
        🛒
      </span>
      {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
    </div>
  );
}

export default CartWidget;
