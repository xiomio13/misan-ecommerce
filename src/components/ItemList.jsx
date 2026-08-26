import React from "react";
import Item from "./Item";

function ItemList({ items }) {
  return (
    <div className="item-list-grid">
      {items.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ItemList;
