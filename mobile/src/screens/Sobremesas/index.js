import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Sobremesas({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  const sobremesas = [
    { nome: "🍨 Sorvetes", cor: "#6EC1E4", destino: "Sorvetes" },
    { nome: "🍰 Bolos", cor: "#F28DAA", destino: "Bolos" },
    { nome: "🍬 Doces", cor: "#B189C6", destino: "Doces" },
  ];

  const filtradas = sobremesas.filter((item) =>
    item.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* Cabeçalho moderno */}
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🍨 Sobremesas</Text>
      </View>

      {/* Barra de pesquisa refinada */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar sobremesa..."
          placeholderTextColor="#AAA"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de opções */}
      <ScrollView contentContainerStyle={styles.content}>
        {filtradas.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuButton, { backgroundColor: item.cor }]}
            onPress={() => navigation.navigate(item.destino)}
            activeOpacity={0.85}
          >
            <Text style={styles.menuButtonText}>{item.nome}</Text>
          </TouchableOpacity>
        ))}

        {filtradas.length === 0 && (
          <Text style={styles.notFoundText}>Nenhum resultado encontrado 😕</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  /* Cabeçalho */
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B0909",
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: "#FFF", fontSize: 28, fontWeight: "bold" },
  headerTitle: { color: "#FFF", fontSize: 26, fontWeight: "bold", letterSpacing: 0.5 },

  /* Pesquisa */
  searchContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#333",
  },

  /* Conteúdo */
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  menuButton: {
    paddingVertical: 28,
    borderRadius: 28,
    alignItems: "center",
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    transform: [{ scale: 1 }],
  },
  menuButtonText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  notFoundText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 40,
  },
});
