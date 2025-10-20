// src/screens/MenuPizzas/index.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const pizzasSalgadas = [
  {
    id: "1",
    nome: "Calabresa",
    ingredientes: "Molho de tomate, mussarela, calabresa fatiada e cebola.",
    preco: 45.9,
    imagem: require("../../assets/images/pizzacalabresa.jpg"),
  },
  {
    id: "2",
    nome: "Margherita",
    ingredientes:
      "Molho de tomate, mussarela, fatias de tomate fresco e manjericão.",
    preco: 42.5,
    imagem: require("../../assets/images/pizzamargueritta.webp"),
  },
  {
    id: "3",
    nome: "Frango com Catupiry",
    ingredientes: "Molho de tomate, mussarela, frango desfiado e catupiry.",
    preco: 48.0,
    imagem: require("../../assets/images/pizzafrango.jpg"),
  },
  {
    id: "4",
    nome: "Portuguesa",
    ingredientes:
      "Molho, mussarela, presunto, ovos, cebola, pimentão e azeitonas.",
    preco: 52.0,
    imagem: require("../../assets/images/pizzaportuguesa.jpg"),
  },
];

const PizzaItem = ({ item, navigation }) => {
  const { addToCart } = useCart();

  return (
    <View style={styles.card}>
      {/* 🔧 Correção: use source={item.imagem} */}
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

export default function MenuPizzas({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#B22222" />

      <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"←"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🍕 Pizzas Salgadas</Text>
      </View>

      <FlatList
        data={pizzasSalgadas}
        renderItem={({ item }) => (
          <PizzaItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B22222",
    paddingBottom: 18,
    paddingHorizontal: 12,
    elevation: 6,
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: "#FFD700", fontSize: 26, fontWeight: "bold" },
  headerTitle: { color: "#FFD700", fontSize: 24, fontWeight: "bold" },
  listContainer: { padding: 18 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 22,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: { padding: 14 },
  name: { fontSize: 20, fontWeight: "bold", color: "#B22222" },
  ingredients: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    marginBottom: 12,
    fontStyle: "italic",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: 18, fontWeight: "bold", color: "#2E8B57" },
  buttonsContainer: { flexDirection: "row", alignItems: "center" },
  detailsButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsButtonText: { color: "#B22222", fontWeight: "bold", fontSize: 13 },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#B22222",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#FFD700", fontSize: 22, fontWeight: "bold" },
});
