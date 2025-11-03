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

const pizzasVeganas = [
    {
        id: "v1",
        nome: "Vegana Margherita",
        ingredientes: "Molho de tomate, queijo vegano, manjericão fresco.",
        preco: 44.9,
        imagem: "src/assets/images/marguerita vegana.jpg",
    },
    {
        id: "v2",
        nome: "Vegana de Legumes",
        ingredientes: "Molho, queijo vegano, abobrinha, berinjela e pimentão.",
        preco: 48.5,
        imagem: "src/assets/images/vegana legumes.jpg",
    },
    {
        id: "v3",
        nome: "Vegana de Cogumelos",
        ingredientes: "Molho, queijo vegano, cogumelos frescos e alho-poró.",
        preco: 49.9,
        imagem: "src/assets/images/vegana cogumelo.jpg",
    },
    {
        id: "v4",
        nome: "Vegana Especial",
        ingredientes: "Molho, rúcula, tomate seco e queijo vegano.",
        preco: 52.0,
        imagem: "src/assets/images/vegana especial.jpg",
    },
];

const PizzaVeganaItem = ({ item, navigation }) => {
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

export default function PizzasVeganas({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  // Filtra as pizzas veganas pelo nome
  const filteredPizzas = pizzasVeganas.filter((pizza) =>
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
        <Text style={styles.headerTitle}>Pizzas Veganas 🌱</Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
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
