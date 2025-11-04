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
// 1. IMPORTAR AS FONTES
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";

export default function Pizzas({ navigation }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const categorias = [
    {
      id: "1",
      nome: "Pizzas Salgadas",
      imagem: require("../../assets/images/pizzasal.jpg"),
      // 2. Mudei 'tela' para 'destino'
      destino: "MenuPizzas",
    },
    {
      id: "2",
      nome: "Pizzas Veganas",
      imagem: require("../../assets/images/pizzaveg.jpg"),
      destino: "PizzasVeganas",
    },
    {
      id: "3",
      nome: "Pizzas Doces",
      imagem: require("../../assets/images/pizzadoce.jpg"),
      destino: "PizzasDoces",
    },
  ];

  const filtradas = categorias.filter((cat) =>
    cat.nome.toLowerCase().includes(search.toLowerCase())
  );

  // 3. ADICIONAR O CARREGAMENTO DA FONTE
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* 4. CABEÇALHO ATUALIZADO (igual ao Sobremesas.js) */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          {/* Você pode trocar "Bravazatta" por "Pizzas" se preferir */}
          <Text style={styles.title}>Bravazatta</Text>
        </View>
      </View>

      {/* 5. BARRA DE PESQUISA ATUALIZADA (estilos) */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7B0909" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar categoria..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 6. LISTA ATUALIZADA (com o novo card) */}
      <FlatList
        data={filtradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.destino)}
            activeOpacity={0.85}
          >
            <Image source={item.imagem} style={styles.cardImage} />
            <View style={styles.cardOverlay} />
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.notFoundText}>
            Nenhuma categoria encontrada 😕
          </Text>
        }
      />
    </View>
  );
}

// 7. ESTILOS SUBSTITUÍDOS (copiados do Sobremesas.js)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B0909",
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  backButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 50,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 40,
  },
  title: {
    fontFamily: "DancingScript_700Bold",
    color: "#FFF",
    fontSize: 34,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 4,
    backgroundColor: "#FFF",
  },
  cardImage: {
    width: "100%",
    height: 160,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  cardText: {
    position: "absolute",
    bottom: 15,
    left: 20,
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  notFoundText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 40,
  },
});