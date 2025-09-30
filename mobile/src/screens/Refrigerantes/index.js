// src/screens/Refrigerantes/index.js
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

const refrigerantes = [
  {
    id: "r1",
    nome: "Coca-Cola",
    ingredientes: "Lata 350ml gelada.",
    preco: 5.0,
    imagem:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1932&auto=format&fit=crop",
  },
  {
    id: "r2",
    nome: "Guaraná Antarctica",
    ingredientes: "Lata 350ml gelada.",
    preco: 5.0,
    imagem:
      "https://images.unsplash.com/photo-1628557114185-6e2e9a97ab62?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "r3",
    nome: "Sprite",
    ingredientes: "Lata 350ml gelada.",
    preco: 5.0,
    imagem:
      "https://images.unsplash.com/photo-1603126857599-1ecdf8d4e755?q=80&w=1887&auto=format&fit=crop",
  },
];

const RefrigeranteItem = ({ item, navigation }) => {
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

export default function Refrigerantes({ navigation }) {
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
        <Text style={styles.headerTitle}>Refrigerantes 🥤</Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={refrigerantes}
        renderItem={({ item }) => (
          <RefrigeranteItem item={item} navigation={navigation} />
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
    backgroundColor: "#0288D1", // azul para diferenciar dos botões de pizza
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
});
