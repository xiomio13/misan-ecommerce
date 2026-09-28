import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';
import styles from './ItemDetail.module.css';

function ItemDetail({ product }) {
  const { id, name, price, img, stock, description, material, fit, sizes = ['S', 'M', 'L', 'XL'], sku } = product;

  const [selectedSize, setSelectedSize] = useState(sizes[0] || 'M');
  const [quantityAdded, setQuantityAdded] = useState(0);

  const { addItem } = useCart();

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);
    addItem({ ...product, selectedSize }, quantity);
  };

  return (
    <article className={styles.detailCard}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={name} className={styles.image} />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.sku}>SKU: {sku || id}</p>
        <div className={styles.price}>S/ {price}.00</div>

        <ul className={styles.specsList}>
          <li>
            <strong>Descripción:</strong> {description}
          </li>
          <li>
            <strong>Composición:</strong> {material || '100% Algodón Pima'}
          </li>
          <li>
            <strong>Calce:</strong> {fit || 'Regular Fit'}
          </li>
          <li>
            <strong>Stock disponible:</strong> {stock} unidades
          </li>
        </ul>

        <div className={styles.sizesBlock}>
          <span className={styles.sizesLabel}>Seleccionar talla:</span>
          <div className={styles.sizesList}>
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {quantityAdded > 0 ? (
          <Link to="/cart" className={styles.btnFinish}>
            Terminar mi compra
          </Link>
        ) : (
          <ItemCount stock={stock} initial={1} onAdd={handleOnAdd} />
        )}
      </div>
    </article>
  );
}

export default ItemDetail;