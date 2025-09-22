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

// 1. IMPORTAMOS O NOSSO "GERENTE" DE CARRINHO
import { useCart } from '../../contexts/CartContext'; // Verifique se este caminho está correto

// --- DADOS DE EXEMPLO (COM PREÇO CORRIGIDO) ---
// ATENÇÃO: O preço foi alterado de string para número para os cálculos funcionarem.
const pizzasSalgadas = [
  {
    id: '1',
    nome: 'Calabresa',
    ingredientes: 'Molho de tomate, mussarela, calabresa fatiada e cebola.',
    preco: 45.90, // <--- MUDANÇA IMPORTANTE
    imagem: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop',
  },
  {
    id: '2',
    nome: 'Margherita',
    ingredientes: 'Molho de tomate, mussarela, fatias de tomate fresco e manjericão.',
    preco: 42.50, // <--- MUDANÇA IMPORTANTE
    imagem: 'https://images.unsplash.com/photo-1598021680133-eb3a73319420?q=80&w=2148&auto=format&fit=crop',
  },
  {
    id: '3',
    nome: 'Frango com Catupiry',
    ingredientes: 'Molho de tomate, mussarela, frango desfiado e catupiry.',
    preco: 48.00, // <--- MUDANÇA IMPORTANTE
    imagem: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '4',
    nome: 'Portuguesa',
    ingredientes: 'Molho, mussarela, presunto, ovos, cebola, pimentão e azeitonas.',
    preco: 52.00, // <--- MUDANÇA IMPORTANTE
    imagem: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop',
  },
];

// --- COMPONENTE DO ITEM DA LISTA (MODIFICADO) ---
const PizzaItem = ({ item }) => {
  // 2. PEGUE A FUNÇÃO addToCart DO NOSSO GERENTE
  const { addToCart } = useCart();

  return (
    // 3. ENVOLVA TUDO COM TouchableOpacity E CHAME A FUNÇÃO NO ONPRESS
    <TouchableOpacity onPress={() => addToCart(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imagem }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.nome}</Text>
          <Text style={styles.itemIngredients}>{item.ingredientes}</Text>
          {/* Usamos .toFixed(2) para garantir que o preço sempre tenha 2 casas decimais */}
          <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Componente Principal da Tela do Cardápio ---
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
        renderItem={({ item }) => <PizzaItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// Estilos (sem alterações)
const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFF8DC',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#7B0909',
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    backButton: {
      padding: 5,
      marginRight: 15,
    },
    backButtonText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerTitle: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: 'bold',
    },
    listContainer: {
      padding: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    itemImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 15,
    },
    itemDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    itemIngredients: {
      fontSize: 14,
      color: '#666',
      marginVertical: 4,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#7B0909',
    },
  });

export default Cardapio;