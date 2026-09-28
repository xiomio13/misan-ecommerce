import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Item.module.css';

function Item({ product }) {
  const { id, name, price, category, img, stock, description } = product;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={name} className={styles.image} loading="lazy" />
        <span className={styles.categoryTag}>{category}</span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.meta}>
          <span className={styles.price}>S/ {price}.00</span>
          {stock > 0 ? (
            <span className={styles.stock}>Stock: {stock} u.</span>
          ) : (
            <span className={styles.outOfStock}>Agotado</span>
          )}
        </div>

        <Link to={`/item/${id}`} className={styles.btnDetail}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default Item;