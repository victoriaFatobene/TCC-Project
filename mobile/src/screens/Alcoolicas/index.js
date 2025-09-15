import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, Dimensions, TouchableOpacity, View, Image } from "react-native";

const { width } = Dimensions.get("window");

const produtos = [
  { id: 1, nome: "Cerveja Heineken", preco: "R$ 8,00", imagem: "https://picsum.photos/seed/heineken/200/200" },
  { id: 2, nome: "Cerveja Budweiser", preco: "R$ 9,50", imagem: "https://picsum.photos/seed/budweiser/200/200" },
  // ... restante dos produtos
];

function ProductCard({ item }) {
  const [uri, setUri] = useState(item.imagem);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri }}
        style={styles.imagem}
        resizeMode="cover"
        onError={() => setUri("https://reactnative.dev/img/tiny_logo.png")}
      />

      <View style={styles.info}>
        <Text style={styles.cardNome} numberOfLines={1}>{item.nome}</Text>
        <Text style={styles.cardPreco}>{item.preco}</Text>
      </View>

      <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
        <Text style={styles.addBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function BebidasAlcoolicas() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍹 Bebidas Alcoólicas</Text>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {produtos.map((p) => <ProductCard key={p.id} item={p} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

// estilos (igual ao anterior)
const ACCENT = "#ff6f00";
const PRICE = "#1E88E5";
const BG = "#F7F8FA";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG, paddingHorizontal: 16 },
  title: { fontSize: width * 0.065, fontWeight: "700", color: "#222", textAlign: "center", marginVertical: 18 },
  content: { paddingBottom: 28 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imagem: { width: width * 0.18, height: width * 0.18, borderRadius: 8, backgroundColor: "#eee" },
  info: { flex: 1, paddingHorizontal: 12, justifyContent: "center" },
  cardNome: { fontSize: width * 0.045, fontWeight: "600", color: "#333" },
  cardPreco: { fontSize: width * 0.038, color: PRICE, marginTop: 6, fontWeight: "700" },
  addBtn: { width: 42, height: 42, borderRadius: 10, backgroundColor: ACCENT, alignItems: "center", justifyContent: "center" },
  addBtnText: { color: "#fff", fontSize: 24, lineHeight: 26, fontWeight: "700" },
});


