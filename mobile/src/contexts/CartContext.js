import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

const CartContext = createContext();

// --- FUNÇÃO AJUDANTE ---
// Cria uma "chave" (ID único) para cada item, 
// baseada no ID do produto, nos extras e nas observações.
const getItemKey = (item) => {
  // 1. Pega os IDs dos extras, ordena (para 'Bacon, Milho' ser igual a 'Milho, Bacon') e junta.
  const extrasId = (item.extras || []).map(e => e.id).sort().join('-');
  // 2. Pega as observações
  const obs = item.observacoes || '';
  // 3. Retorna a chave única
  return `${item.id}-${extrasId}-${obs}`;
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // 1. Pega a chave única do produto que está sendo adicionado
    const productKey = getItemKey(product);
    
    // 2. Procura se um item com ESSA MESMA CHAVE já existe
    const existingProduct = cartItems.find(item => getItemKey(item) === productKey);

    if (existingProduct) {
      // 3. SE EXISTE, aumenta a quantidade SÓ DELE
      setCartItems(
        cartItems.map(item =>
          getItemKey(item) === productKey
            ? { ...item, quantidade: (item.quantidade || 0) + 1 }
            : item
        )
      );
    } else {
      // 4. SE NÃO EXISTE, é um item novo (ex: pizza com extras diferentes)
      // Adiciona com a quantidade 1
      setCartItems([...cartItems, { ...product, quantidade: 1 }]);
    }
    
    // 5. REMOVIDO! O Alert.alert("Sucesso!") foi removido daqui.
    // A tela ProductDetails.js já mostra um alerta. 
    // Manter aqui causava dois alertas (um com "NaN" e outro sem).
  };

  // 6. ATUALIZADO para receber extras e observações
  const decreaseQuantity = (productId, extras, observacoes) => {
    const productKey = getItemKey({ id: productId, extras, observacoes });
    const existingProduct = cartItems.find(item => getItemKey(item) === productKey);

    if (existingProduct && existingProduct.quantidade === 1) {
      // Se a quantidade for 1, remove o item
      removeFromCart(productId, extras, observacoes);
    } else {
      // Se for maior que 1, só diminui
      setCartItems(
        cartItems.map(item =>
          getItemKey(item) === productKey
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
      );
    }
  };

  // 7. ATUALIZADO para receber extras e observações
  const removeFromCart = (productId, extras, observacoes) => {
    const productKey = getItemKey({ id: productId, extras, observacoes });
    setCartItems(cartItems.filter(item => getItemKey(item) !== productKey));
  };

  // A função clearCart está perfeita
  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
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