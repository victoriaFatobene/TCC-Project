// src/contexts/CartContext.js

import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

// Cria o Contexto
const CartContext = createContext();

// Cria o Provedor do Contexto (o "Gerente")
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar um item ao carrinho
  const addToCart = (product) => {
    // Verifica se o produto já existe no carrinho
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      // Se já existe, apenas aumenta a quantidade
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      // Se não existe, adiciona o novo produto com quantidade 1
      setCartItems([...cartItems, { ...product, quantidade: 1 }]);
    }

    Alert.alert("Sucesso!", `${product.nome} foi adicionado ao carrinho.`);
  };

  // Aqui você poderia adicionar outras funções como removeFromCart, clearCart, etc.

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook customizado para facilitar o uso do contexto em outras telas
export function useCart() {
  return useContext(CartContext);
}