import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const categories = [
  {
    name: "Pizzas Tradicionais",
    image: require("../assets/images/pizza.png"),
    subcategories: ["Mussarela", "Calabresa", "Portuguesa", "Frango Catupiry"],
  },
  {
    name: "Pizzas Veganas",
    image: require("../assets/images/pizza_vegana.png"),
    subcategories: ["Mussarela Vegana", "Marguerita Vegana", "Shimeji", "Brócolis"],
  },
  {
    name: "Bebidas",
    image: require("../assets/images/bebidas.png"),
    subcategories: ["Refrigerante", "Suco Natural", "Água", "Cerveja"],
  },
  {
    name: "Sobremesas",
    image: require("../assets/images/sobremesa.png"),
    subcategories: ["Petit Gateau", "Torta de Limão", "Pudim", "Sorvete"],
  },
  {
    name: "Acompanhamentos",
    image: require("../assets/images/acompanhamentos.png"),
    subcategories: ["Batata Frita", "Anéis de Cebola", "Pão de Alho", "Salada"],
  },
];

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍕 Cardápio</Text>

      {/* Categorias */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryCard,
              selectedCategory === item.name && styles.categoryCardActive,
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === item.name ? null : item.name
              )
            }
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Subcategorias */}
      <ScrollView style={styles.subcategoryContainer}>
        {selectedCategory ? (
          <>
            <Text style={styles.subtitle}>👉 {selectedCategory}</Text>
            {categories
              .find((c) => c.name === selectedCategory)
              ?.subcategories.map((sub, index) => (
                <View key={index} style={styles.subCard}>
                  <Text style={styles.subText}>{sub}</Text>
                </View>
              ))}
          </>
        ) : (
          <Text style={styles.hint}>Selecione uma categoria acima 👆</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#d35400",
  },
  categoryList: {
    paddingHorizontal: 10,
  },
  categoryCard: {
    width: width * 0.35,
    backgroundColor: "#f4f4f4",
    marginHorizontal: 8,
    borderRadius: 16,
    alignItems: "center",
    padding: 12,
    elevation: 3,
  },
  categoryCardActive: {
    backgroundColor: "#ffe6cc",
    borderWidth: 1,
    borderColor: "#d35400",
  },
  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  subcategoryContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e67e22",
    marginBottom: 10,
  },
  subCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  subText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  hint: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    color: "#888",
  },
});
