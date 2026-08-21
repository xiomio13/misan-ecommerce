import React from 'react';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import './App.css'; // Importación de los estilos generales del layout

function App() {
  return (
    <div className="app-layout">
      {/* 1. Barra de navegación con logo, categorías y carrito */}
      <Navbar />

      {/* 2. Contenedor principal con prop de saludo personalizada */}
      <main>
        <ItemListContainer greeting="¡Bienvenido a Misan! Lo mejor en moda masculina" />
      </main>
    </div>
  );
}

export default App;
