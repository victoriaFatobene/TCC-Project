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
            /* --- A CORREÇÃO ESTÁ AQUI --- */
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item, categoria: 'doce' })
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

      {/* Barra de pesquisa - Seu componente aqui estava errado, usei o do outro arquivo */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar doce..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredDoces}
        renderItem={({ item }) => (
          <DoceItem item={item} navigation={navigation} addToCart={addToCart} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.notFoundText}>Nenhum doce encontrado 😕</Text>
        }
      />
    </View>
  );
}

// ... (Seus estilos estão corretos, só renomeei 'emptyText' para 'notFoundText' e 'searchBar' para 'searchContainer/searchInput' para consistência)
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
  searchContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
  },
  listContainer: { padding: 18 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 22,
    overflow: "hidden",
    elevation: 6,
  },
  image: { width: "100%", height: 200, resizeMode: "cover" },
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
  notFoundText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginTop: 40,
  },
});