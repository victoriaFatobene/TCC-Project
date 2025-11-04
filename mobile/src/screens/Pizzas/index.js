import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Pizzas({ navigation }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const categorias = [
    {
      id: "1",
      nome: "Pizzas Salgadas",
      imagem: require("../../assets/images/pizzasal.jpg"),
      tela: "MenuPizzas",
    },
    {
      id: "2",
      nome: "Pizzas Veganas",
      imagem: require("../../assets/images/pizzaveg.jpg"),
      tela: "PizzasVeganas",
    },
    {
      id: "3",
      nome: "Pizzas Doces",
      imagem: require("../../assets/images/pizzadoce.jpg"),
      tela: "PizzasDoces",
    },
  ];

  const filtradas = categorias.filter((cat) =>
    cat.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B0E10" />

      {/* Cabeçalho */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pizzas</Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B4E45" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar categoria..."
          placeholderTextColor="#A9A9A9"
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
            style={styles.card}
            onPress={() => navigation.navigate(item.tela)}
            activeOpacity={0.9}
          >
            <Image source={item.imagem} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma categoria encontrada</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF8F5" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4B0E10",
    paddingBottom: 20,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginRight: 8,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
    letterSpacing: 1,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins_400Regular",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5DED8",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginRight: 20,
    resizeMode: "cover",
  },
  cardText: {
    color: "#651b1bff",
    fontSize: 20,
    fontFamily: "sans-serif-medium",
  },

  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 40,
    fontFamily: "Poppins_400Regular",
  },
});
