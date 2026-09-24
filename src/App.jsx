// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Auth from "./components/Auth";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* 1. Proveedor de autenticación de Firebase */}
      <AuthProvider>
        {/* 2. Proveedor del estado del carrito */}
        <CartProvider>
          <div className="app-layout">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Catálogo completo */}
                <Route
                  path="/"
                  element={
                    <ItemListContainer greeting="¡Bienvenido a Misan! Lo mejor en moda masculina" />
                  }
                />

                {/* Catálogo filtrado por categoría */}
                <Route
                  path="/category/:categoryId"
                  element={
                    <ItemListContainer greeting="Catálogo por Categoría" />
                  }
                />

                {/* Detalle del producto */}
                <Route path="/item/:itemId" element={<ItemDetailContainer />} />

                {/* Carrito de compras */}
                <Route path="/cart" element={<Cart />} />

                {/* Flujo de Checkout con persistencia en Firestore */}
                <Route path="/checkout" element={<Checkout />} />

                {/* Pantalla de Registro e Inicio de sesión */}
                <Route path="/auth" element={<Auth />} />

                {/* Redirección preventiva */}
                <Route path="/admin" element={<Navigate to="/" replace />} />

                {/* Error 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
