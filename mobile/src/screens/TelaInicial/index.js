import React from "react";
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  const categories = [
    { name: "Pizzas", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/uulzo8g5_expires_30_days.png", color: "#F44336", screen: "Cardapio" },
    { name: "Bebidas", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/88znwjll_expires_30_days.png", color: "#2196F3", screen: "Cardapio" },
    { name: "Favoritos", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/d174b2pj_expires_30_days.png", color: "#FF9800", screen: "Cardapio" },
    { name: "Sobremesas", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/snpswyio_expires_30_days.png", color: "#9C27B0", screen: "Cardapio" },
    { name: "Rodízios", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/z9p8vx67_expires_30_days.png", color: "#4CAF50", screen: "Cardapio" },
    { name: "Acompanhamentos", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/alzgc0j5_expires_30_days.png", color: "#00BCD4", screen: "Cardapio" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>🍕 Menu Principal</Text>

        <View style={styles.cardsContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: cat.color }]}
              onPress={() => navigation.navigate(cat.screen)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: cat.img }} style={styles.cardImage} resizeMode="contain" />
              <Text style={styles.cardText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF8E7" },
  scrollContainer: { paddingVertical: 30, paddingHorizontal: 20, alignItems: "center" },
  header: { fontSize: 36, fontWeight: "bold", color: "#333", marginBottom: 30 },
  cardsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  card: {
    width: 140,
    height: 180,
    borderRadius: 20,
    margin: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardImage: { width: 100, height: 100, marginBottom: 10 },
  cardText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});


