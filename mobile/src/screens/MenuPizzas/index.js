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
import { Ionicons } from "@expo/vector-icons";

const pizzasSalgadas = [
  {
    id: "1",
    nome: "Calabresa",
    ingredientes: "Molho de tomate, calabresa, cebola e mussarela.",
    preco: 42.9,
    imagem:
      "https://images.unsplash.com/photo-1628840042765-3561f65e1b6f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    nome: "Frango com Catupiry",
    ingredientes: "Molho de tomate, frango desfiado e catupiry.",
    preco: 45.9,
    imagem:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    nome: "Quatro Queijos",
    ingredientes: "Mussarela, provolone, parmesão e gorgonzola.",
    preco: 48.9,
    imagem:
      "https://images.unsplash.com/photo-1615297928064-2492f5641e86?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    nome: "Portuguesa",
    ingredientes: "Presunto, ovos, cebola, azeitona e mussarela.",
    preco: 49.9,
    imagem:
      "https://images.unsplash.com/photo-1618213837799-8d4d2f4e4e6c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "5",
    nome: "Pepperoni",
    ingredientes: "Molho de tomate, pepperoni e mussarela.",
    preco: 47.9,
    imagem:
      "https://images.unsplash.com/photo-1601924928376-3e7d7f3a4f82?q=80&w=2070&auto=format&fit=crop",
  },
];

const PizzaSalgadaItem = ({ item, navigation }) => {
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
              <Ionicons name="add" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function Pizzas({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pizzas Salgadas 🍕</Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={pizzasSalgadas}
        renderItem={({ item }) => (
          <PizzaSalgadaItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ESTILOS — mesmo design da tela vegana
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFDF8" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B0909",
    paddingVertical: 18,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: { marginRight: 15 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", letterSpacing: 0.5 },

  listContainer: { padding: 16 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  image: { width: "100%", height: 190, resizeMode: "cover" },
  cardContent: { padding: 14 },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  ingredients: { fontSize: 14, color: "#666", marginTop: 4, marginBottom: 12 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: 16, fontWeight: "bold", color: "#7B0909" },

  buttonsContainer: { flexDirection: "row", alignItems: "center" },
  detailsButton: {
    backgroundColor: "#f4f4f4",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsButtonText: { color: "#333", fontWeight: "600", fontSize: 13 },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#B02A30",
    justifyContent: "center",
    alignItems: "center",
  },
});

