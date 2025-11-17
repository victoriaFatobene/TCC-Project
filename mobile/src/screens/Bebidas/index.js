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
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";

export default function Bebidas({ navigation }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const categorias = [
    {
      id: "1",
      nome: "Refrigerantes",
      imagem: require("../../assets/images/refrigerantes.png"),
      destino: "Refrigerantes",
    },
    {
      id: "2",
      nome: "Sucos Naturais",
      imagem: require("../../assets/images/sucos.jpg"),
      destino: "Sucos",
    },
    {
      id: "3",
      nome: "Bebidas Alcoólicas",
      imagem: require("../../assets/images/alcoolicas.jpg"),
      destino: "Alcoolicas",
    },
    {
      id: "4",
      nome: "Vinhos",
      imagem: require("../../assets/images/vinhos.webp"),
      destino: "Vinhos",
    },
  ];

  const filtradas = categorias.filter((cat) =>
    cat.nome.toLowerCase().includes(search.toLowerCase())
  );

  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* Cabeçalho */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bravazatta</Text>
        </View>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7B0909" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar bebida..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Lista */}
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
          <Text style={styles.notFoundText}>Nenhuma bebida encontrada 😕</Text>
        }
      />
    </View>
  );
}

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
    height: 180, // levemente maior
    resizeMode: "contain", // ← faz a imagem aparecer inteira
    backgroundColor: "#FFF", // evita bordas escuras
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  cardText: {
    position: "absolute",
    bottom: 15,
    left: 20,
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.6)",
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
