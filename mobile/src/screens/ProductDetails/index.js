// src/screens/ProductDetails/index.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../../contexts/CartContext'; // Para o botão "Adicionar ao carrinho"

// Recebe { route, navigation }
// route.params contém os dados que enviamos da tela anterior
export default function ProductDetails({ route, navigation }) {
  // Pega o objeto 'product' que foi passado como parâmetro
  const { product } = route.params;
  const { addToCart } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        {/* O título da página é o nome do produto */}
        <Text style={styles.headerTitle}>{product.nome}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.imagem }} style={styles.productImage} />

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.nome}</Text>
          <Text style={styles.productPrice}>R$ {product.preco.toFixed(2)}</Text>
          <Text style={styles.productDescription}>
            {product.ingredientes || 'Descrição detalhada do produto aqui.'}
          </Text>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={() => addToCart(product)}>
          <Text style={styles.cartButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#6D1E1E' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#5B0000', paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#000' },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: '#EEFF00', fontSize: 24, fontWeight: 'bold' },
  headerTitle: { color: '#EEFF00', fontSize: 22, fontWeight: 'bold', flex: 1 }, // flex: 1 para o texto não cortar
  content: { padding: 20 },
  productImage: { width: '100%', height: 250, borderRadius: 15, marginBottom: 20 },
  detailsContainer: { backgroundColor: '#5B0000', borderRadius: 15, padding: 20, marginBottom: 30 },
  productName: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  productPrice: { fontSize: 24, fontWeight: 'bold', color: '#EEFF00', marginBottom: 20 },
  productDescription: { fontSize: 16, color: '#FFFFFF', lineHeight: 24 },
  cartButton: { backgroundColor: '#FFF89E', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  cartButtonText: { color: '#000000', fontSize: 18, fontWeight: 'bold' },
});