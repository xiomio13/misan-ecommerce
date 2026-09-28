import React from "react";
import Item from "../Item/Item";
import styles from "./ItemList.module.css";

function ItemList({ items }) {
  return (
    <div className={styles.grid}>
      {items.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ItemList;
