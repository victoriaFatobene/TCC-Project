import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Bebidas({ navigation }) {
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
        <Text style={styles.headerTitle}>Bebidas 🥤</Text>
      </View>

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
          // --- A CORREÇÃO ESTÁ AQUI ---
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
  refrigerante: { backgroundColor: "#0288D1" },
  suco: { backgroundColor: "#F9A825" },
  alcoolica: { backgroundColor: "#6D4C41" },
  vinho: { backgroundColor: "#8E24AA" },
});