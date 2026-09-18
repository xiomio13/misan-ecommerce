// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de un CartProvider");
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Inmutabilidad estricta: nunca push ni mutación directa
  const addItem = (item, quantity) => {
    setCart((prevCart) => {
      const exists = prevCart.find((p) => p.id === item.id);

      if (exists) {
        return prevCart.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p,
        );
      }

      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== itemId));
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some((p) => p.id === id);
  };

  // Cálculos derivados en tiempo de render
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
