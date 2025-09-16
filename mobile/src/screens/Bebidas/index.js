import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// Exemplo de lista de bebidas
const bebidas = [
  { id: 1, name: "Coca-Cola", price: "R$ 5,00", image: "https://cdn-icons-png.flaticon.com/512/2250/2250237.png" },
  { id: 2, name: "Suco de Laranja", price: "R$ 6,50", image: "https://cdn-icons-png.flaticon.com/512/2933/2933802.png" },
  { id: 3, name: "Água Mineral", price: "R$ 3,00", image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  { id: 4, name: "Cerveja", price: "R$ 8,00", image: "https://cdn-icons-png.flaticon.com/512/4905/4905027.png" },
];

export default function Bebidas() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bebidas 🍹</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {bebidas.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4CAF50",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
});
