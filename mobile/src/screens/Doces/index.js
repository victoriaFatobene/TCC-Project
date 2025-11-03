// src/screens/Doces/index.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const doces = [
  {
    id: "do1",
    nome: "Pudim de Leite",
    preco: 12.0,
    imagem: require("../../assets/images/pudim.webp"),
    ingredientes: "Pudim de leite condensado com calda de caramelo.",
  },
  {
    id: "do2",
    nome: "Mousse de Maracujá",
    preco: 10.0,
    imagem: require("../../assets/images/mousse.jpg"),
    ingredientes: "Mousse aerado com polpa natural de maracujá.",
  },
];

const DoceItem = ({ item, navigation, addToCart }) => (
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

export default function Doces({ navigation }) {
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  // Filtra os doces pelo nome
  const filteredDoces = doces.filter((d) =>
    d.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doces 🍬</Text>
      </View>

      {/* Barra de pesquisa */}
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar doces..."
        placeholderTextColor="#777"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredDoces}
        renderItem={({ item }) => (
          <DoceItem item={item} navigation={navigation} addToCart={addToCart} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum doce encontrado 😕</Text>
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
  backButtonText: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },
  searchBar: {
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFF",
    borderRadius: 20,
    fontSize: 16,
    color: "#333",
    elevation: 2,
  },
  listContainer: { paddingHorizontal: 16, paddingBottom: 16 },
  emptyText: { textAlign: "center", color: "#777", marginTop: 20, fontSize: 16 },
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
  image: { width: "100%", height: 160, resizeMode: "cover" },
  cardContent: { padding: 12 },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  ingredients: { fontSize: 14, color: "#777", marginTop: 4, marginBottom: 10 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
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
