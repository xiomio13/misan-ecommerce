// src/components/ItemCount.jsx
import React, { useState } from "react";

function ItemCount({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="item-count-box">
      <div className="counter-controls">
        <button
          type="button"
          className="btn-counter"
          onClick={handleDecrement}
          disabled={count <= 0}
        >
          -
        </button>
        <span className="counter-number">{count}</span>
        <button
          type="button"
          className="btn-counter"
          onClick={handleIncrement}
          disabled={count >= stock}
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="btn-add-cart"
        disabled={stock === 0 || count === 0}
        onClick={() => count > 0 && onAdd && onAdd(count)}
      >
        {stock === 0 ? "Agotado" : "Agregar al carrito"}
      </button>
    </div>
  );
}

export default ItemCount;
