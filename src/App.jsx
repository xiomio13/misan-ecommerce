// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import ItemDetailContainer from './components/ItemDetailContainer';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {/* Renderizamos la vista de detalle solicitada en esta pre-entrega */}
        <ItemDetailContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;