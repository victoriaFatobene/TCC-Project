// src/screens/PizzasVeganas/index.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../../contexts/CartContext'; // Importe o carrinho

const pizzasVeganas = [
  { id: 'v1', nome: "Veggie Supreme", preco: 28.00, imagem: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=1999&auto=format&fit=crop" },
  { id: 'v2', nome: "Margherita Vegana", preco: 25.00, imagem: "https://images.unsplash.com/photo-1620374643423-276c1231a540?q=80&w=1964&auto=format&fit=crop" },
  { id: 'v3', nome: "Portobello Gourmet", preco: 30.00, imagem: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=2070&auto=format&fit=crop" },
];

const VeganPizzaItem = ({ item }) => {
  const { addToCart } = useCart();
  return (
    <TouchableOpacity style={styles.card} onPress={() => addToCart(item)}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
      </View>
      <View style={styles.addBtn}>
        <Text style={styles.addBtnText}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function PizzasVeganas({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pizzas Veganas 🌱</Text>
      </View>
      <FlatList
        data={pizzasVeganas}
        renderItem={({ item }) => <VeganPizzaItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// Reutilizando os mesmos estilos
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7B0909', paddingVertical: 15, paddingHorizontal: 10 },
    backButton: { padding: 5, marginRight: 15 },
    backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
    headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
    listContainer: { padding: 16 },
    card: { flexDirection: 'row', backgroundColor: "#FFF", borderRadius: 12, padding: 12, marginBottom: 16, alignItems: 'center', elevation: 3 },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
    cardContent: { flex: 1 },
    name: { fontSize: 18, fontWeight: '600' },
    price: { fontSize: 16, color: '#555', marginTop: 4 },
    addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' },
    addBtnText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
});