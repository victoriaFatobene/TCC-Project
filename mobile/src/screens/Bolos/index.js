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

const bolos = [
  { id: "bo1", nome: "Bolo de Chocolate", preco: 15.0, imagem: require("../../assets/images/bolochocolate.webp"), ingredientes: "Fatia generosa de bolo de chocolate com cobertura cremosa." },
  { id: "bo2", nome: "Torta Holandesa", preco: 18.0, imagem: require("../../assets/images/tortaholandesa.webp"), ingredientes: "Base de biscoito, creme holandês e cobertura de ganache." },
  { id: "bo3", nome: "Cheesecake de Frutas", preco: 20.0, imagem: require("../../assets/images/cheesecake.jpg"), ingredientes: "Cheesecake cremoso com calda de frutas vermelhas." },
];

const BoloItem = ({ item, navigation }) => {
  const { addToCart } = useCart();
  return (
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
              onPress={() => navigation.navigate("ProductDetails", { product: item, categoria: 'doce' })}
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
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  const filteredBolos = bolos.filter(b => b.nome.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bolos 🍰</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar bolo..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredBolos}
        renderItem={({ item }) => <BoloItem item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.notFoundText}>Nenhum bolo encontrado 😕</Text>}
      />
    </View>
  );
}

// ... (Seus estilos estão corretos)
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