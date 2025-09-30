import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Bebidas({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bebidas 🥤</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.menuButton, styles.refrigerante]}
          onPress={() => navigation.navigate("Refrigerantes")}
        >
          <Text style={styles.menuButtonText}>🥤 Refrigerantes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.suco]}
          onPress={() => navigation.navigate("Sucos")}
        >
          <Text style={styles.menuButtonText}>🍊 Sucos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.alcoolica]}
          onPress={() => navigation.navigate("Alcoolicas")}
        >
          <Text style={styles.menuButtonText}>🍺 Alcoólicas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuButton, styles.vinho]}
          onPress={() => navigation.navigate("Vinhos")}
        >
          <Text style={styles.menuButtonText}>🍷 Vinhos</Text>
        </TouchableOpacity>
      </View>
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

  // cores diferentes para cada tipo
  refrigerante: { backgroundColor: "#0288D1" }, // azul
  suco: { backgroundColor: "#F9A825" }, // amarelo/laranja
  alcoolica: { backgroundColor: "#6D4C41" }, // marrom cerveja
  vinho: { backgroundColor: "#8E24AA" }, // roxo vinho
});
