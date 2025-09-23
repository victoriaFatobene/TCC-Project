import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Importamos o nosso "gerente" de carrinho
import { useCart } from '../../contexts/CartContext';

// Seus dados de pizza, com o preço já corrigido para número
const pizzasSalgadas = [
    {
        id: '1',
        nome: 'Calabresa',
        ingredientes: 'Molho de tomate, mussarela, calabresa fatiada e cebola.',
        preco: 45.90,
        imagem: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop',
    },
    {
        id: '2',
        nome: 'Margherita',
        ingredientes: 'Molho de tomate, mussarela, fatias de tomate fresco e manjericão.',
        preco: 42.50,
        imagem: 'https://images.unsplash.com/photo-1598021680133-eb3a73319420?q=80&w=2148&auto=format&fit=crop',
    },
    {
        id: '3',
        nome: 'Frango com Catupiry',
        ingredientes: 'Molho de tomate, mussarela, frango desfiado e catupiry.',
        preco: 48.00,
        imagem: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '4',
        nome: 'Portuguesa',
        ingredientes: 'Molho, mussarela, presunto, ovos, cebola, pimentão e azeitonas.',
        preco: 52.00,
        imagem: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop',
    },
];

// O PizzaItem agora recebe 'navigation' para poder navegar
const PizzaItem = ({ item, navigation }) => {
  const { addToCart } = useCart();

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imagem }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <View>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemIngredients}>{item.ingredientes}</Text>
            <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {/* BOTÃO "VER MAIS" */}
          <TouchableOpacity 
            style={styles.detailsButton} 
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <Text style={styles.detailsButtonText}>Ver Mais</Text>
          </TouchableOpacity>

          {/* BOTÃO "+" PARA ADICIONAR AO CARRINHO */}
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Componente Principal da Tela do Cardápio
function Cardapio({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pizzas Salgadas</Text>
      </View>
      <FlatList
        data={pizzasSalgadas}
        // Passamos 'navigation' para cada item da lista
        renderItem={({ item }) => <PizzaItem item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// Estilos ATUALIZADOS para incluir os novos botões
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF8DC' },
    header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7B0909', paddingVertical: 15, paddingHorizontal: 10 },
    backButton: { padding: 5, marginRight: 15 },
    backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
    headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
    listContainer: { padding: 10 },
    itemContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, marginBottom: 15, elevation: 3 },
    itemImage: { width: 100, height: 100, borderRadius: 8, marginRight: 15 },
    itemDetails: { flex: 1, justifyContent: 'space-between' },
    itemName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    itemIngredients: { fontSize: 14, color: '#666', marginVertical: 4, flexShrink: 1 },
    itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#7B0909' },
    buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    detailsButton: { backgroundColor: '#f0f0f0', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
    detailsButtonText: { color: '#333', fontWeight: 'bold' },
    addButton: { backgroundColor: '#4CAF50', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    addButtonText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
});

export default Cardapio;