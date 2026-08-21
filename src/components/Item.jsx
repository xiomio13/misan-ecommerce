import React, { useState } from "react";

// Componente que recibe la información del polo como props
function Item({ nombre, precio, descripcion, categoria }) {
  // 1. Estados locales independientes para cada producto
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

  // 2. Funciones controladoras del contador
  const handleSumar = () => {
    // Usamos la forma funcional para garantizar el valor previo más reciente
    setCantidad((prev) => prev + 1);
  };

  const handleRestar = () => {
    // Evitamos números negativos: solo resta si es mayor a 0
    setCantidad((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // 3. Función para alternar el estado de favorito
  const toggleFavorite = () => {
    // Invierte el valor actual (de false a true, o de true a false)
    setEsFavorito((prev) => !prev);
  };

  return (
    <div style={tarjetaEstilo}>
      {/* Botón de Favorito con ícono y estilo condicional */}
      <button
        onClick={toggleFavorite}
        style={botonFavoritoEstilo(esFavorito)}
        title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {esFavorito ? "❤️ Favorito" : "🤍 Guardar"}
      </button>

      <span style={categoriaEstilo}>{categoria}</span>
      <h3 style={{ margin: "8px 0" }}>{nombre}</h3>
      <p style={{ color: "#666", fontSize: "14px" }}>{descripcion}</p>
      <p style={precioEstilo}>S/ {precio}.00</p>

      {/* Sección del Contador */}
      <div style={contadorContenedor}>
        <button
          onClick={handleRestar}
          style={botonContadorEstilo}
          disabled={cantidad === 0}
        >
          -
        </button>

        <span style={cantidadNumeroEstilo}>{cantidad}</span>

        <button onClick={handleSumar} style={botonContadorEstilo}>
          +
        </button>
      </div>

      <p
        style={{
          fontSize: "12px",
          color: cantidad > 0 ? "#2a9d8f" : "#888",
          marginTop: "6px",
        }}
      >
        {cantidad > 0
          ? `Unidades seleccionadas: ${cantidad}`
          : "Selecciona una cantidad"}
      </p>
    </div>
  );

  // Estilos limpios en línea para visualizar el componente ordenado
  const tarjetaEstilo = {
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "16px",
    width: "260px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    fontFamily: "sans-serif",
  };

  const categoriaEstilo = {
    fontSize: "11px",
    textTransform: "uppercase",
    color: "#888",
    fontWeight: "bold",
    letterSpacing: "1px",
  };

  const precioEstilo = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1d3557",
    margin: "10px 0",
  };

  const contadorContenedor = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginTop: "10px",
    padding: "6px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  };

  const botonContadorEstilo = {
    width: "32px",
    height: "32px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    cursor: "pointer",
  };

  const cantidadNumeroEstilo = {
    fontSize: "16px",
    fontWeight: "bold",
    minWidth: "24px",
    textAlign: "center",
  };

  const botonFavoritoEstilo = (activo) => ({
    alignSelf: "flex-end",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "13px",
    fontWeight: "600",
    color: activo ? "#e63946" : "#6c757d",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  });
}

export default Item;
