import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

// Exemplo de dados de pizzas veganas
const pizzasVeganas = [
  { id: 1, nome: "Veggie Supreme", preco: "R$ 28,00", imagem: "https://via.placeholder.com/150" },
  { id: 2, nome: "Margherita Vegana", preco: "R$ 25,00", imagem: "https://via.placeholder.com/150" },
  { id: 3, nome: "Portobello Gourmet", preco: "R$ 30,00", imagem: "https://via.placeholder.com/150" },
  { id: 4, nome: "Quatro Queijos Vegano", preco: "R$ 32,00", imagem: "https://via.placeholder.com/150" },
];

export default function PizzasVeganas() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Pizzas Veganas 🌱</Text>
          <Text style={styles.subHeaderText}>Deliciosas opções sem ingredientes de origem animal!</Text>
        </View>

        {/* Lista de pizzas */}
        <View style={styles.list}>
          {pizzasVeganas.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardPrice}>{item.preco}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff8f0" },
  scrollContent: { padding: 16, paddingBottom: 50 },

  header: { alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: width * 0.08, fontWeight: "bold", color: "#28a745", textAlign: "center" },
  subHeaderText: { fontSize: width * 0.045, color: "#6fcf97", textAlign: "center", marginTop: 4 },

  list: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },

  card: {
    width: width * 0.45,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: { width: "100%", height: width * 0.45 },
  cardContent: { padding: 8 },
  cardTitle: { fontSize: width * 0.045, fontWeight: "600", color: "#333" },
  cardPrice: { fontSize: width * 0.04, fontWeight: "500", color: "#28a745", marginTop: 4 },
});
