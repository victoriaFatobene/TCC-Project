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

const pizzasDoces = [
  {
    id: "d1",
    nome: "Pizza de Chocolate",
    ingredientes: "Coberta com muito chocolate ao leite derretido.",
    preco: 34.9,
    imagem:
      "https://images.unsplash.com/photo-1617196039897-c824dff0b8d2?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "d2",
    nome: "Pizza de Morango com Chocolate",
    ingredientes: "Chocolate derretido e morangos frescos.",
    preco: 39.9,
    imagem:
      "https://images.unsplash.com/photo-1632932227092-4a7929fdbefb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "d3",
    nome: "Pizza de Banana com Canela",
    ingredientes: "Banana fatiada, açúcar e canela polvilhada.",
    preco: 32.5,
    imagem:
      "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "d4",
    nome: "Pizza de Nutella",
    ingredientes: "Recheada e coberta com creme de avelã.",
    preco: 42.0,
    imagem:
      "https://images.unsplash.com/photo-1593560708920-61dd95d6d251?q=80&w=2070&auto=format&fit=crop",
  },
];

const PizzaDoceItem = ({ item, navigation }) => {
  const { addToCart } = useCart();
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.ingredients}>{item.ingredientes}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("ProductDetails", { product: item })
              }
            >
              <Text style={styles.detailsButtonText}>🍴 Ver Mais</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addToCart({ ...item, quantidade: 1 })}
            >
              <Text style={styles.addBtnText}>➕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function PizzasDoces({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  // Filtra as pizzas doces pelo nome
  const filteredPizzas = pizzasDoces.filter((pizza) =>
    pizza.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* Cabeçalho */}
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pizzas Doces 🍫</Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pizza doce..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de pizzas */}
      <FlatList
        data={filteredPizzas}
        renderItem={({ item }) => (
          <PizzaDoceItem item={item} navigation={navigation} />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B0909",
    paddingBottom: 15,
    paddingHorizontal: 10,
    elevation: 4,
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: "#FFF", fontSize: 24, fontWeight: "bold" },
  headerTitle: { color: "#FFF", fontSize: 22, fontWeight: "bold" },

  searchContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: { fontSize: 16, color: "#333" },

  listContainer: { padding: 16 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: { width: "100%", height: 180, resizeMode: "cover" },
  cardContent: { padding: 12 },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  ingredients: { fontSize: 14, color: "#777", marginTop: 4, marginBottom: 10 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: 16, fontWeight: "bold", color: "#7B0909" },
  buttonsContainer: { flexDirection: "row", alignItems: "center" },
  detailsButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  detailsButtonText: { color: "#333", fontWeight: "bold", fontSize: 12 },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
  notFoundText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginTop: 40,
  },
});
