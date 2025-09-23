// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantidade: (item.quantidade || 0) + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantidade: 1 }]);
    }
    Alert.alert("Sucesso!", `${product.nome} foi adicionado ao carrinho.`);
  };

  const decreaseQuantity = (productId) => {
    const existingProduct = cartItems.find(item => item.id === productId);
    if (existingProduct && existingProduct.quantidade === 1) {
      removeFromCart(productId);
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === productId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // --- FUNÇÃO NOVA ---
  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart, // <-- Adicionada aqui para o app poder usar
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}