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
      <CartProvider>
        <div className="app-layout">
          <Navbar />

          <main className="main-content">
            <Routes>
              {/* Catálogo completo */}
              <Route 
                path="/" 
                element={<ItemListContainer greeting="¡Bienvenido a Misan! Lo mejor en moda masculina" />} 
              />

              {/* Catálogo por categoría */}
              <Route 
                path="/category/:categoryId" 
                element={<ItemListContainer greeting="Catálogo por Categoría" />} 
              />

              {/* Detalle de producto individual */}
              <Route 
                path="/item/:itemId" 
                element={<ItemDetailContainer />} 
              />

              {/* Vista del carrito de compras */}
              <Route 
                path="/cart" 
                element={<Cart />} 
              />

              {/* Redirección preventiva */}
              <Route 
                path="/admin" 
                element={<Navigate to="/" replace />} 
              />

              {/* 404 Not Found */}
              <Route 
                path="*" 
                element={<NotFound />} 
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;