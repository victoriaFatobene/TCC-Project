import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Bem-vindo ao App!</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cardapio")}>
          <Text style={styles.buttonText}>Cardápio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Pedidos")}>
          <Text style={styles.buttonText}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Perfil")}>
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 40 },
  button: { backgroundColor: "#4CAF50", paddingVertical: 15, paddingHorizontal: 50, borderRadius: 12, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
