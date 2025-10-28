import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Bebidas({ navigation }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  // Categorias de bebidas
  const categorias = [
    {
      id: "1",
      nome: "Refrigerantes",
      emoji: "🥤",
      cor: "#0288D1",
      tela: "Refrigerantes",
    },
    {
      id: "2",
      nome: "Sucos",
      emoji: "🍊",
      cor: "#F9A825",
      tela: "Sucos",
    },
    {
      id: "3",
      nome: "Alcoólicas",
      emoji: "🍺",
      cor: "#6D4C41",
      tela: "Alcoolicas",
    },
    {
      id: "4",
      nome: "Vinhos",
      emoji: "🍷",
      cor: "#8E24AA",
      tela: "Vinhos",
    },
  ];

  // Filtro da barra de pesquisa
  const filtradas = categorias.filter((cat) =>
    cat.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#B02A30" />

      {/* Cabeçalho */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bebidas 🥤</Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#B02A30" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar bebida..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Lista de categorias */}
      <FlatList
        data={filtradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.cor }]}
            onPress={() => navigation.navigate(item.tela)}
            activeOpacity={0.85}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma bebida encontrada 😕</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B02A30",
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginRight: 8,
  },
  headerTitle: {
    color: "#FFF8F0",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  emoji: {
    fontSize: 38,
    marginRight: 20,
  },
  cardText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginTop: 40,
  },
});
