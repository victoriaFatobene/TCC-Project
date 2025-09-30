// src/screens/Sucos/index.js
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

const sucos = [
  {
    id: "s1",
    nome: "Suco de Laranja",
    ingredientes: "Natural, 300ml.",
    preco: 7.5,
    imagem:
      "https://images.unsplash.com/photo-1617196039897-0ec90ffb47d4?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "s2",
    nome: "Suco de Uva",
    ingredientes: "Integral, 300ml.",
    preco: 8.0,
    imagem:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: "s3",
    nome: "Suco de Abacaxi",
    ingredientes: "Natural, 300ml.",
    preco: 7.5,
    imagem:
      "https://images.unsplash.com/photo-1623065427557-d7c2a2dff7e3?q=80&w=1887&auto=format&fit=crop",
  },
];

const SucoItem = ({ item, navigation }) => {
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

export default function Sucos({ navigation }) {
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
        <Text style={styles.headerTitle}>Sucos 🧃</Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={sucos}
        renderItem={({ item }) => <SucoItem item={item} navigation={navigation} />}
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
    backgroundColor: "#F9A825", // amarelo para diferenciar os sucos
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
});

