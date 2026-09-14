// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Layout persistente: Navbar visible en todas las rutas */}
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* 1. Ruta Inicio (catálogo completo) */}
            <Route 
              path="/" 
              element={<ItemListContainer greeting="¡Bienvenido a Misan! Lo mejor en moda masculina" />} 
            />

            {/* 2. Ruta Categoría dinámica */}
            <Route 
              path="/category/:categoryId" 
              element={<ItemListContainer greeting="Catálogo por Categoría" />} 
            />

            {/* 3. Ruta Detalle individual */}
            <Route 
              path="/item/:itemId" 
              element={<ItemDetailContainer />} 
            />

            {/* Redirección preventiva para zonas privadas */}
            <Route 
              path="/admin" 
              element={<Navigate to="/" replace />} 
            />

            {/* 4. Ruta comodín de error 404 */}
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </main>

        {/* Layout persistente: Footer visible en todas las rutas */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;