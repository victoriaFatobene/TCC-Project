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

const sorvetes = [
  { id: "t1", nome: "Sorvete de Chocolate", ingredientes: "Cremoso, feito com cacau puro.", preco: 12.9, imagem: require("../../assets/images/sorvetechoco.webp") },
  { id: "t2", nome: "Sorvete de Morango", ingredientes: "Natural com pedaços de morango fresco.", preco: 11.5, imagem: require("../../assets/images/sorvetemorango.jpg") },
  { id: "t3", nome: "Sorvete de Creme", ingredientes: "Tradicional, sabor leve e clássico.", preco: 10.0, imagem: require("../../assets/images/sorvetecreme.webp") },
  { id: "t4", nome: "Açaí na Tigela", ingredientes: "Com granola e banana.", preco: 14.0, imagem: require("../../assets/images/acai.webp") },
];

const SorveteItem = ({ item, navigation }) => {
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
              onPress={() => navigation.navigate("ProductDetails", { product: item })}
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

export default function Sorvetes({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  const filteredSorvetes = sorvetes.filter((item) =>
    item.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sorvetes 🍨</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar sorvete..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredSorvetes}
        renderItem={({ item }) => <SorveteItem item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.notFoundText}>Nenhum sorvete encontrado 😕</Text>}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
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

