import React from "react";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <ItemListContainer greeting="¡Bienvenido a Misan! Lo mejor en moda masculina" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
