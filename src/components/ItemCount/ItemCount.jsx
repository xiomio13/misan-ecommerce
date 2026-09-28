import React, { useState } from "react";
import styles from "./ItemCount.module.css";

function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.countContainer}>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btnControl}
          onClick={handleDecrement}
          disabled={count <= 1}
        >
          -
        </button>
        <span className={styles.countValue}>{count}</span>
        <button
          type="button"
          className={styles.btnControl}
          onClick={handleIncrement}
          disabled={count >= stock}
        >
          +
        </button>
      </div>

      <button
        type="button"
        className={styles.btnAdd}
        onClick={() => onAdd(count)}
        disabled={stock === 0}
      >
        {stock === 0 ? "Sin stock disponible" : "Agregar al carrito"}
      </button>
    </div>
  );
}

export default ItemCount;
