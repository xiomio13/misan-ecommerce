// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1. Agregar producto de forma inmutable con validación de stock
  const addItem = (item, quantity) => {
    setCart((prevCart) => {
      const exists = prevCart.find((p) => p.id === item.id);

      if (exists) {
        return prevCart.map((p) => {
          if (p.id === item.id) {
            const newQuantity = p.quantity + quantity;
            const finalQuantity = item.stock ? Math.min(newQuantity, item.stock) : newQuantity;
            return { ...p, quantity: finalQuantity };
          }
          return p;
        });
      }

      return [...prevCart, { ...item, quantity }];
    });
  };

  // 2. Eliminar producto por ID
  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== itemId));
  };

  // 3. Vaciar carrito completo
  const clear = () => {
    setCart([]);
  };

  // 4. Verificar si un item ya está en el carrito
  const isInCart = (id) => {
    return cart.some((p) => p.id === id);
  };

  // 5. Totales acumulados con .reduce()
  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
  const totalPrice = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}