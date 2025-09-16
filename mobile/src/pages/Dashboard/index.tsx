import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Exemplo de card */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Pedidos</Text>
          <Text style={styles.cardDescription}>Ver todos os pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Produtos</Text>
          <Text style={styles.cardDescription}>Gerenciar produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Relatórios</Text>
          <Text style={styles.cardDescription}>Ver relatórios de vendas</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f8fa", paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: "700", color: "#222", marginVertical: 16, textAlign: "center" },
  scrollContent: { paddingBottom: 30 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontSize: 20, fontWeight: "600", marginBottom: 4 },
  cardDescription: { fontSize: 16, color: "#555" },
});
