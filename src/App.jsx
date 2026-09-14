// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Inicio: Catálogo general */}
            <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a Misan!" />} />

            {/* Vista dinámica de producto por ID */}
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />

            {/* Ruta por defecto para errores 404 */}
            <Route path="*" element={<h2 style={{ textAlign: 'center', margin: '4rem 0', color: '#1d3557' }}>404 - Página no encontrada</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;