import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../../contexts/CartContext'; // Importa nosso hook

function Carrinho({ navigation }) {
  // Pega os itens e as funções do nosso "gerente" global
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  // Calcula o subtotal a partir dos itens do contexto
  const subtotal = cartItems.reduce((total, p) => total + p.preco * p.quantidade, 0);

  const finalizarPedido = () => {
    Alert.alert("Pedido Finalizado", `Total: R$ ${subtotal.toFixed(2)}`);
    // Aqui você pode adicionar a lógica para limpar o carrinho ou navegar para outra tela
  };

  // Se o carrinho estiver vazio, mostra uma mensagem amigável
  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Meu Carrinho 🛒</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.browseText}>Navegar pelo cardápio</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Renderiza um item da lista
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(item.id)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantidade}</Text>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Text style={styles.remove}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meu Carrinho 🛒</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContainer}
      />
      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: R$ {subtotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={finalizarPedido}>
          <Text style={styles.checkoutText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#4CAF50", marginVertical: 20 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 15, padding: 15, marginBottom: 15, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 3 },
  image: { width: 70, height: 70, borderRadius: 12, marginRight: 15 },
  cardContent: { flex: 1 },
  name: { fontSize: 18, fontWeight: "600" },
  price: { fontSize: 16, color: "#888", marginVertical: 5 },
  controls: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  button: { backgroundColor: "#4CAF50", width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  quantity: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  remove: { marginLeft: 15, color: "#FF5252", fontWeight: "600" },
  footer: { padding: 20, borderTopWidth: 1, borderColor: "#EEE", backgroundColor: "#FFF" },
  subtotal: { fontSize: 20, fontWeight: "600", marginBottom: 15 },
  checkoutButton: { backgroundColor: "#4CAF50", paddingVertical: 15, borderRadius: 12, alignItems: "center" },
  checkoutText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 22, color: '#333', marginBottom: 20 },
  browseText: { fontSize: 18, color: '#4CAF50', textDecorationLine: 'underline' },
});

export default Carrinho;