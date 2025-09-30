import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useCart } from "../../contexts/CartContext";

const alcoolicas = [
  { id: "al1", nome: "Cerveja Heineken", preco: 9.0, imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Heineken_Bottle.png/480px-Heineken_Bottle.png", ingredientes: "Long neck 330ml." },
  { id: "al2", nome: "Cerveja Budweiser", preco: 8.5, imagem: "https://upload.wikimedia.org/wikipedia/commons/6/66/Budweiser_king_of_beers.jpg", ingredientes: "Long neck 330ml." },
  { id: "al3", nome: "Caipirinha de Limão", preco: 15.0, imagem: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Caipirinha.jpg", ingredientes: "Cachaça, limão, açúcar e gelo." },
   { id: "al3", nome: "Caipirinha de Morango", preco: 15.0, imagem: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Caipirinha.jpg", ingredientes: "Cachaça, morango, açúcar e gelo." },
];

const AlcoolicaItem = ({ item, navigation, cardWidth }) => {
  const { addToCart } = useCart();
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate("ProductDetails", { product: item })}
        >
          <Text style={styles.detailsButtonText}>Ver Mais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Alcoolicas({ navigation }) {
  const { width } = useWindowDimensions();

  // 🔥 Responsividade:
  const numColumns = width < 400 ? 1 : width < 800 ? 2 : 3; // celular = 1, tablet = 2, web = 3
  const cardWidth = (width - 32 - (numColumns - 1) * 12) / numColumns;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bebidas Alcoólicas 🍺</Text>
      </View>

      <FlatList
        data={alcoolicas}
        renderItem={({ item }) => (
          <AlcoolicaItem item={item} navigation={navigation} cardWidth={cardWidth} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? { gap: 12 } : null}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B0909",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },

  listContainer: {
    padding: 16,
    gap: 12,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  name: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  price: { fontSize: 14, color: "#555", marginTop: 4, textAlign: "center" },
  buttonsContainer: { flexDirection: "row", marginTop: 8 },
  detailsButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  detailsButtonText: { color: "#333", fontWeight: "bold", fontSize: 12 },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
});
