import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Pizzas({ navigation }) {
  const insets = useSafeAreaInsets();

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
        <Text style={styles.headerTitle}>Pizzas 🍕</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.menuButton, styles.salgada]}
          onPress={() => navigation.navigate("MenuPizzas")}
        >
          <Text style={styles.menuButtonText}>🍕 Pizzas Salgadas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.vegana]}
          onPress={() => navigation.navigate("PizzasVeganas")}
        >
          <Text style={styles.menuButtonText}>🌱 Pizzas Veganas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.doce]}
          onPress={() => navigation.navigate("PizzasDoces")}
        >
          <Text style={styles.menuButtonText}>🍫 Pizzas Doces</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },

  content: { flex: 1, justifyContent: "center", padding: 20 },

  menuButton: {
    padding: 22,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  menuButtonText: { fontSize: 20, fontWeight: "bold", color: "#fff" },

  // cores diferentes para cada categoria
  salgada: { backgroundColor: "#E53935" },
  vegana: { backgroundColor: "#43A047" },
  doce: { backgroundColor: "#8E24AA" },
});