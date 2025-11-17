import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- MUDANÇA: Importar a fonte e ícones ---
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { Ionicons } from "@expo/vector-icons";

const pizzasVeganas = [
  // ... (sua lista de pizzas está correta) ...
  {
    id: "v1",
    nome: "Vegana Margherita",
    ingredientes: "Molho de tomate, queijo vegano, manjericão fresco.",
    preco: 44.9,
    imagem: require("../../assets/images/marguerita vegana.jpg"),
  },
  {
    id: "v2",
    nome: "Vegana de Legumes",
    ingredientes: "Molho, queijo vegano, abobrinha, berinjela e pimentão.",
    preco: 48.5,
    imagem: require("../../assets/images/vegana legumes.jpg"),
  },
  {
    id: "v3",
    nome: "Vegana de Cogumelos",
    ingredientes: "Molho, queijo vegano, cogumelos frescos e alho-poró.",
    preco: 49.9,
    imagem: require("../../assets/images/vegana cogumelo.jpg"),
  },
  {
    id: "v4",
    nome: "Vegana Especial",
    ingredientes: "Molho, rúcula, tomate seco e queijo vegano.",
    preco: 52.0,
    imagem: require("../../assets/images/vegana especial.jpg"),
  },
];

const PizzaVeganaItem = ({ item, navigation }) => {
  const { addToCart } = useCart();
  return (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.ingredients}>{item.ingredientes}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("ProductDetails", { product: item, categoria: 'salgado' })
              }
            >
              {/* --- MUDANÇA: Texto do botão --- */}
              <Text style={styles.detailsButtonText}>Ver Mais</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addToCart({ ...item, quantidade: 1 })}
            >
              {/* --- MUDANÇA: Ícone do botão --- */}
              <Ionicons name="add" size={24} color="#FFECD1" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function PizzasVeganas({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  // --- MUDANÇA: Carregar a fonte ---
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  const filteredPizzas = pizzasVeganas.filter((pizza) =>
    pizza.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!fontsLoaded) {
    return null; // Aguarda a fonte carregar
  }

  return (
    <View style={styles.container}>
      {/* --- MUDANÇA: Cor do StatusBar --- */}
      <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />

      {/* --- MUDANÇA: Cabeçalho com o novo estilo --- */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={[styles.backButton, { top: insets.top + 12 }]} // Alinha com o 'insets'
        >
          <Ionicons name="chevron-back" size={28} color="#FFECD1" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Pizzas Veganas</Text>
        </View>
      </View>

      {/* --- MUDANÇA: Barra de pesquisa com o novo estilo --- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7C1D26" style={styles.inputIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pizza vegana..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de pizzas */}
      <FlatList
        data={filteredPizzas}
        renderItem={({ item }) => (
          <PizzaVeganaItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.notFoundText}>Nenhuma pizza encontrada 😕</Text>
        }
      />
    </View>
  );
}

// --- MUDANÇA: Estilos atualizados (idênticos ao MenuPizzas) ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFFDF6" // Cor de fundo principal
  },
  header: {
    backgroundColor: '#7C1D26', // Cor do cabeçalho principal
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 5,
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: "DancingScript_700Bold", // Fonte
    color: "#FFECD1", // Cor
    fontSize: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 22,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#F3EDE2',
  },
  inputIcon: {
    paddingLeft: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 22,
    paddingTop: 25,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24, // Borda da TelaInicial
    marginBottom: 24, // Margin da TelaInicial
    overflow: "hidden",
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F3EDE2', // Borda da TelaInicial
  },
  image: { width: "100%", height: 200, resizeMode: "cover" },
  cardContent: { padding: 18 }, // Mais padding
  name: { 
    fontSize: 22, // Maior
    fontWeight: "bold", 
    color: "#7C1D26" // Cor principal
  },
  ingredients: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    marginBottom: 12,
    fontStyle: "italic",
    lineHeight: 20, // Mais espaço
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { 
    fontSize: 20, // Maior
    fontWeight: "bold", 
    color: "#7C1D26" // Cor principal
  },
  buttonsContainer: { flexDirection: "row", alignItems: "center" },
  detailsButton: {
    backgroundColor: "#FFECD1", // Cor do cabeçalho
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsButtonText: { 
    color: "#7C1D26", // Cor principal
    fontWeight: "bold", 
    fontSize: 13 
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#7C1D26", // Cor principal
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { 
    color: "#FFECD1", // Cor do cabeçalho
    fontSize: 22, 
    fontWeight: "bold" 
  },
  notFoundText: {
    textAlign: "center",
    color: "#888", // Tom mais suave
    fontSize: 16,
    marginTop: 40,
  },
});