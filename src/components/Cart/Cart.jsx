import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

function Cart() {
  const { cart, removeItem, clear, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.emptyCard}>
          <h2 className={styles.title}>Tu carrito está vacío</h2>
          <p>No tienes productos seleccionados en este momento.</p>
          <Link to="/" className={styles.btnReturn}>
            Explorar catálogo de polos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.cartContainer}>
      <h1 className={styles.title}>Carrito de Compras</h1>

      <div className={styles.itemsList}>
        {cart.map((item) => {
          const itemKey = `${item.id}-${item.selectedSize || 'std'}`;
          return (
            <article key={itemKey} className={styles.cartItem}>
              <img src={item.img} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.itemMeta}>
                  Talla: <strong>{item.selectedSize || 'Estándar'}</strong> | Cantidad: {item.quantity} | Unitario: S/ {item.price}.00
                </div>
              </div>

              <div className={styles.itemSubtotal}>
                S/ {item.price * item.quantity}.00
              </div>

              <button
                type="button"
                className={styles.btnRemove}
                onClick={() => removeItem(item.id)}
                title="Eliminar producto"
              >
                ✕
              </button>
            </article>
          );
        })}
      </div>

      <footer className={styles.footerActions}>
        <div className={styles.totalText}>
          Total a pagar: <span>S/ {totalPrice}.00</span>
        </div>

        <div className={styles.buttonsGroup}>
          <button type="button" className={styles.btnClear} onClick={clear}>
            Vaciar Carrito
          </button>
          <Link to="/checkout" className={styles.btnCheckout}>
            Continuar con el pago
          </Link>
        </div>
      </footer>
    </section>
  );
}

export default Cart;