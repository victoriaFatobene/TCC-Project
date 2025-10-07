import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert, // <-- A CORREÇÃO ESTÁ AQUI
} from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductDetails({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const insets = useSafeAreaInsets();

  const handleAddToCart = () => {
    addToCart({ ...product, quantidade: 1 });
    // Agora o Alert vai funcionar
    // Alert.alert("Sucesso!", `${product.nome} foi adicionado ao carrinho.`);
  };

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
        <Text style={styles.headerTitle} numberOfLines={1}>{product.nome}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.imagem }} style={styles.productImage} />

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.nome}</Text>
          <Text style={styles.productPrice}>R$ {product.preco.toFixed(2)}</Text>
          <Text style={styles.productDescription}>
            {product.ingredientes || "Descrição detalhada do produto aqui."}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.cartButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>
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
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },

  content: { padding: 20, paddingBottom: 40 },

  productImage: {
    width: "100%",
    height: 280,
    borderRadius: 20,
    marginBottom: 20,
  },

  detailsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productName: { fontSize: 26, fontWeight: "bold", color: "#333" },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7B0909",
    marginVertical: 10,
  },
  productDescription: { fontSize: 16, color: "#666", lineHeight: 22 },

  cartButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
  },
  cartButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});