import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Produtos iniciais no carrinho
const produtosIniciais = [
  { id: 1, name: "Coca-Cola", price: 5.0, quantity: 1, image: "https://cdn-icons-png.flaticon.com/512/2250/2250237.png" },
  { id: 2, name: "Suco de Laranja", price: 6.5, quantity: 2, image: "https://cdn-icons-png.flaticon.com/512/2933/2933802.png" },
  { id: 3, name: "Água Mineral", price: 3.0, quantity: 1, image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
];

export default function Carrinho() {
  const [produtos, setProdutos] = useState(produtosIniciais);

  const incrementar = (id) => {
    setProdutos(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
    );
  };

  const decrementar = (id) => {
    setProdutos(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p)
    );
  };

  const removerProduto = (id) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  const subtotal = produtos.reduce((total, p) => total + p.price * p.quantity, 0).toFixed(2);

  const finalizarPedido = () => {
    Alert.alert("Pedido Finalizado", `Total: R$ ${subtotal}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meu Carrinho 🛒</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {produtos.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
              <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={() => decrementar(item.id)}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity style={styles.button} onPress={() => incrementar(item.id)}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removerProduto(item.id)}>
                  <Text style={styles.remove}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: R$ {subtotal}</Text>
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
  button: { backgroundColor: "#4CAF50", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  quantity: { marginHorizontal: 10, fontSize: 16 },
  remove: { marginLeft: 15, color: "#FF5252", fontWeight: "600" },
  footer: { padding: 20, borderTopWidth: 1, borderColor: "#EEE", backgroundColor: "#FFF" },
  subtotal: { fontSize: 20, fontWeight: "600", marginBottom: 15 },
  checkoutButton: { backgroundColor: "#4CAF50", paddingVertical: 15, borderRadius: 12, alignItems: "center" },
  checkoutText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
});
