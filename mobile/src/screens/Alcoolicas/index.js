import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { Ionicons } from '@expo/vector-icons'; // ícones do Expo

const alcoolicas = [
  { id: 'al1', nome: "Cerveja Heineken", preco: 9.00, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5X_8_Q_w_z_y_x_y_x_y_x_y_x_y_x_y_x_y_x_y&s", ingredientes: 'Long neck 330ml.' },
  { id: 'al2', nome: "Cerveja Budweiser", preco: 8.50, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5X_8_Q_w_z_y_x_y_x_y_x_y_x_y_x_y_x_y_x_y&s", ingredientes: 'Long neck 330ml.' },
  { id: 'al3', nome: "Caipirinha de Limão", preco: 15.00, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_2f_x_w_z_y_x_y_x_y_x_y_x_y_x_y_x_y_x_y&s", ingredientes: 'Cachaça, limão, açúcar e gelo.' },
];

const AlcoolicaItem = ({ item, navigation }) => {
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

export default function Alcoolicas({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bebidas Alcoólicas 🍺</Text>
      </View>

      <FlatList
        data={alcoolicas}
        renderItem={({ item }) => <AlcoolicaItem item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// Estilos
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#7B0909', 
    paddingVertical: 15, 
    paddingHorizontal: 10 
  },
  backButton: { 
    padding: 5, 
    marginRight: 10 
  },
  headerTitle: { 
    color: '#FFFFFF', 
    fontSize: width * 0.055, // tamanho responsivo
    fontWeight: 'bold' 
  },
  listContainer: { padding: 16 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: "#FFF", 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 16, 
    alignItems: 'center', 
    elevation: 3 
  },
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


