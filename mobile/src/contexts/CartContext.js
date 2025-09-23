// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

// Cria o Contexto (não mexe aqui)
const CartContext = createContext();

// Cria o Provedor do Contexto (o "Gerente" do carrinho)
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar um item ou incrementar a quantidade
  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      // Se já existe, apenas aumenta a quantidade
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantidade: (item.quantidade || 0) + 1 } // Adicionado (item.quantidade || 0) para segurança
            : item
        )
      );
    } else {
      // Se não existe, adiciona o novo produto com quantidade 1
      setCartItems([...cartItems, { ...product, quantidade: 1 }]);
    }
    Alert.alert("Sucesso!", `${product.nome} foi adicionado ao carrinho.`);
  };

  // Função para decrementar a quantidade de um produto
  const decreaseQuantity = (productId) => {
    const existingProduct = cartItems.find(item => item.id === productId);

    // Se a quantidade for 1, remove o item completamente
    if (existingProduct && existingProduct.quantidade === 1) {
      removeFromCart(productId);
    } else {
      // Senão, apenas diminui a quantidade
      setCartItems(
        cartItems.map(item =>
          item.id === productId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
      );
    }
  };

  // Função para remover completamente um produto do carrinho
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // O PONTO CRÍTICO ESTÁ AQUI:
  // O objeto 'value' PRECISA conter TODAS as funções que você quer usar no app.
  const value = {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart, // <-- Agora a função está sendo fornecida!
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook customizado para facilitar o uso do contexto
export function useCart() {
  return useContext(CartContext);
}