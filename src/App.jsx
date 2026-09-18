// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Proveedor de Estado Global del Carrito */}
      <CartProvider>
        <div className="app-layout">
          {/* Header persistente con logo, categorías y CartWidget */}
          <Navbar />

          <main className="main-content">
            <Routes>
              {/* 1. Catálogo completo */}
              <Route 
                path="/" 
                element={<ItemListContainer greeting="¡Bienvenido a Misan! Lo mejor en moda masculina" />} 
              />

              {/* 2. Catálogo filtrado por categoría */}
              <Route 
                path="/category/:categoryId" 
                element={<ItemListContainer greeting="Catálogo por Categoría" />} 
              />

              {/* 3. Ficha de detalle de producto individual */}
              <Route 
                path="/item/:itemId" 
                element={<ItemDetailContainer />} 
              />

              {/* 4. Vista dedicada del carrito de compras (Pre-entrega 6) */}
              <Route 
                path="/cart" 
                element={<Cart />} 
              />

              {/* Redirección preventiva */}
              <Route 
                path="/admin" 
                element={<Navigate to="/" replace />} 
              />

              {/* 5. Vista 404 para URLs no válidas */}
              <Route 
                path="*" 
                element={<NotFound />} 
              />
            </Routes>
          </main>

          {/* Footer persistente */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;