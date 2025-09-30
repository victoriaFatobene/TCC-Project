// src/screens/Pizzas/index.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCart } from "../../contexts/CartContext";

const pizzasSalgadas = [
  {
    id: "1",
    nome: "Calabresa",
    ingredientes: "Molho de tomate, mussarela, calabresa fatiada e cebola.",
    preco: 45.9,
    imagem:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop",
  },
  {
    id: "2",
    nome: "Margherita",
    ingredientes:
      "Molho de tomate, mussarela, fatias de tomate fresco e manjericão.",
    preco: 42.5,
    imagem:
      "https://images.unsplash.com/photo-1598021680133-eb3a73319420?q=80&w=2148&auto=format&fit=crop",
  },
  {
    id: "3",
    nome: "Frango com Catupiry",
    ingredientes: "Molho de tomate, mussarela, frango desfiado e catupiry.",
    preco: 48.0,
    imagem:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983d34?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    nome: "Portuguesa",
    ingredientes:
      "Molho, mussarela, presunto, ovos, cebola, pimentão e azeitonas.",
    preco: 52.0,
    imagem:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
  },
];

const PizzaItem = ({ item, navigation }) => {
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
              <Text style={styles.detailsButtonText}>Ver Mais</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function MenuPizzas({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pizzas Salgadas 🍕</Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={pizzasSalgadas}
        renderItem={({ item }) => (
          <PizzaItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B0909",
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 4,
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },

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
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
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
});
