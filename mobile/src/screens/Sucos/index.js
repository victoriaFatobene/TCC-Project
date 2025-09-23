import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../../contexts/CartContext';

const sucos = [
  { id: 'su1', nome: "Suco de Laranja", preco: 10.00, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhVwmGAV2KzDDa52rG2Pq_pLz5V3Ff_Xb9aQ&s", ingredientes: 'Natural, feito na hora com laranjas frescas. 500ml.' },
  { id: 'su2', nome: "Suco de Abacaxi", preco: 10.00, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBJg58U7_P_hY1yC38Q7j6b7p2K9F_wX5b3g&s", ingredientes: 'Natural, feito na hora com abacaxi. 500ml.' },
];

const SucoItem = ({ item, navigation }) => {
  const { addToCart } = useCart();
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.name}>{item.nome}</Text>
          <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
            <Text style={styles.detailsButtonText}>Ver Mais</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function Sucos({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sucos</Text>
      </View>
      <FlatList
        data={sucos}
        renderItem={({ item }) => <SucoItem item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7B0909', paddingVertical: 15, paddingHorizontal: 10 },
    backButton: { padding: 5, marginRight: 15 },
    backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
    headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
    listContainer: { padding: 16 },
    card: { flexDirection: 'row', backgroundColor: "#FFF", borderRadius: 12, padding: 12, marginBottom: 16, alignItems: 'center', elevation: 3 },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 12, backgroundColor: '#eee' },
    cardContent: { flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: 18, fontWeight: '600' },
    price: { fontSize: 16, color: '#555', marginTop: 4 },
    buttonsContainer: { flexDirection: 'row', alignItems: 'center' },
    detailsButton: { backgroundColor: '#f0f0f0', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, marginRight: 10 },
    detailsButtonText: { color: '#333', fontWeight: 'bold', fontSize: 12 },
    addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' },
    addBtnText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
});
