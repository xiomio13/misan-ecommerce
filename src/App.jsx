import React from "react";
import Item from "./components/Item";

function App() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#1d3557" }}>
          Misan - Tienda de Polos para Caballero
        </h1>
        <p style={{ color: "#457b9d" }}>Colección Exclusiva de Temporada</p>
      </header>

      {/* Contenedor en cuadrícula para los productos */}
      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <Item
          nombre="Polo Piqué Clásico"
          precio={59}
          descripcion="100% algodón pima con cuello camisero tradicional."
          categoria="Clásico"
        />

        <Item
          nombre="Polo Slim Fit Urbano"
          precio={65}
          descripcion="Corte entallado, suave al tacto y costuras reforzadas."
          categoria="Moderno"
        />

        <Item
          nombre="Polo Oversize Vintage"
          precio={72}
          descripcion="Estilo holgado y casual en algodón pesado premium."
          categoria="Tendencia"
        />
      </main>
    </div>
  );
}

export default App;
