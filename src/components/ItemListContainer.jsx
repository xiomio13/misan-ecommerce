import React from "react";

// Recibe la prop 'greeting' desestructurada
function ItemListContainer({ greeting }) {
  return (
    <section className="item-list-container">
      {/* Encabezado centrado que muestra el mensaje dinámico */}
      <h1>{greeting}</h1>
      <p className="item-list-subtitle">
        Explora nuestra colección exclusiva de polos para caballero.
      </p>
    </section>
  );
}

export default ItemListContainer;
