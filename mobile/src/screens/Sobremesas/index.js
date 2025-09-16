import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

// Exemplo de dados de sobremesas
const sobremesas = [
  { id: 1, nome: "Brigadeiro", preco: "R$ 5,00", imagem: "https://via.placeholder.com/150" },
  { id: 2, nome: "Pudim", preco: "R$ 7,00", imagem: "https://via.placeholder.com/150" },
  { id: 3, nome: "Sorvete", preco: "R$ 6,50", imagem: "https://via.placeholder.com/150" },
];

export default function Sobremesas() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Sobremesas 🍰</Text>
          <Text style={styles.subHeaderText}>Delícias doces para finalizar sua refeição!</Text>
        </View>

        {/* Lista de sobremesas */}
        <View style={styles.list}>
          {sobremesas.map((item) => (
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
  headerText: { fontSize: width * 0.08, fontWeight: "bold", color: "#ff6b00", textAlign: "center" },
  subHeaderText: { fontSize: width * 0.045, color: "#ff914d", textAlign: "center", marginTop: 4 },

  list: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },

  card: {
    width: width * 0.45,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: { width: "100%", height: width * 0.45 },
  cardContent: { padding: 8 },
  cardTitle: { fontSize: width * 0.045, fontWeight: "600", color: "#333" },
  cardPrice: { fontSize: width * 0.04, fontWeight: "500", color: "#ff6b00", marginTop: 4 },
});
