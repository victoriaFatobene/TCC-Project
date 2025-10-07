// src/screens/Bolos/index.js
import React from "react";
import {
  // MODIFICAÇÃO 1: Trocamos SafeAreaView por View e adicionamos StatusBar
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useCart } from "../../contexts/CartContext";
// MODIFICAÇÃO 2: Importamos o hook da área segura
import { useSafeAreaInsets } from "react-native-safe-area-context";

const bolos = [
  {
    id: "bo1",
    nome: "Bolo de Chocolate",
    preco: 15.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9f-y_o-4w_z-Y7X7l2p_xX5y_j8W6e8z8w&s",
    ingredientes: "Fatia generosa de bolo de chocolate com cobertura cremosa.",
  },
  {
    id: "bo2",
    nome: "Torta Holandesa",
    preco: 18.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-q-j8c_w-l6Z-X6Y-y_r4Z_xV-c_o7d7bQ&s",
    ingredientes: "Base de biscoito, creme holandês e cobertura de ganache.",
  },
  {
    id: "bo3",
    nome: "Cheesecake de Frutas",
    preco: 20.0,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-v-H5X_x_f-D_w_e-j5F_x_y-L6Z&s",
    ingredientes: "Cheesecake cremoso com calda de frutas vermelhas.",
  },
];

const BoloItem = ({ item, navigation }) => {
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
              onPress={() => addToCart({ ...item, quantidade: 1 })}
            >
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function Bolos({ navigation }) {
  // MODIFICAÇÃO 3: Pegamos os valores da área segura
  const insets = useSafeAreaInsets();

  return (
    // MODIFICAÇÃO 4: Usamos uma View normal como container
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* HEADER */}
      {/* MODIFICAÇÃO 5: Aplicamos o padding do topo dinamicamente */}
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bolos 🍰</Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={bolos}
        renderItem={({ item }) => (
          <BoloItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B0909",
    // MODIFICAÇÃO 6: Trocamos paddingVertical por paddingBottom
    paddingBottom: 15,
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
    height: 160,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  ingredients: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    marginBottom: 10,
  },
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