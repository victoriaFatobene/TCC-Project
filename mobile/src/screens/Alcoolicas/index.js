// src/screens/Alcoolicas/index.js (ou onde estiver)
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../../contexts/CartContext'; // Importe o carrinho

const produtos = [
  { id: 'a1', nome: "Cerveja Heineken", preco: 8.00, imagem: "https://picsum.photos/seed/heineken/200/200" },
  { id: 'a2', nome: "Cerveja Budweiser", preco: 9.50, imagem: "https://picsum.photos/seed/budweiser/200/200" },
  // ... restante dos produtos
];

const ProductItem = ({ item }) => {
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

export default function BebidasAlcoolicas({ navigation }) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Bebidas Alcoólicas 🍺</Text>
        </View>
        <FlatList
            data={produtos}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    );
}

// Reutilizando os mesmos estilos da tela de Bebidas
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