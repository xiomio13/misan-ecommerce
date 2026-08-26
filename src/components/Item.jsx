import React from "react";

function Item({ product }) {
  const { name, price, category, img, stock, description } = product;

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img src={img} alt={name} className="product-image" loading="lazy" />
        <span className="product-category-tag">{category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>

        <div className="product-meta">
          <span className="product-price">S/ {price}.00</span>
          <span className="product-stock">Stock: {stock} u.</span>
        </div>

        <button className="btn-detail" type="button">
          Ver detalle
        </button>
      </div>
    </article>
  );
}

export default Item;
