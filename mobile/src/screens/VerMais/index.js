import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VerMais({ navigation, route }) {
  const insets = useSafeAreaInsets();

  // Se vierem dados da pizza via rota
  const pizza = route?.params?.pizza || {
    nome: "Calabresa Especial",
    precoBase: 39.9,
  };

  const ingredientesExtras = [
    { id: "1", nome: "Bacon", preco: 4.0 },
    { id: "2", nome: "Catupiry", preco: 3.5 },
    { id: "3", nome: "Milho", preco: 2.0 },
    { id: "4", nome: "Cebola", preco: 1.5 },
    { id: "5", nome: "Azeitona", preco: 2.5 },
  ];

  const [extrasSelecionados, setExtrasSelecionados] = useState([]);

  const precoTotal = (
    pizza.precoBase +
    extrasSelecionados.reduce((acc, item) => acc + item.preco, 0)
  ).toFixed(2);

  const toggleIngrediente = (ingrediente) => {
    const jaTem = extrasSelecionados.find((i) => i.id === ingrediente.id);

    if (jaTem) {
      // remove ingrediente
      setExtrasSelecionados((prev) => prev.filter((i) => i.id !== ingrediente.id));
    } else {
      // adiciona ingrediente
      setExtrasSelecionados((prev) => [...prev, ingrediente]);
    }
  };

  const renderIngrediente = ({ item }) => {
    const selecionado = extrasSelecionados.find((i) => i.id === item.id);
    return (
      <TouchableOpacity
        style={[styles.ingredienteItem, selecionado && styles.ingredienteSelecionado]}
        onPress={() => toggleIngrediente(item)}
      >
        <Text style={styles.nomeIngrediente}>{item.nome}</Text>
        <Text style={styles.precoIngrediente}>+ R$ {item.preco.toFixed(2)}</Text>
        <Text style={styles.acaoIngrediente}>
          {selecionado ? "Remover" : "Adicionar"}
        </Text>
      </TouchableOpacity>
    );
  };

  const confirmar = () => {
    alert(
      `✅ ${pizza.nome}\nTotal: R$ ${precoTotal}\n\nExtras: ${
        extrasSelecionados.length > 0
          ? extrasSelecionados.map((i) => i.nome).join(", ")
          : "Nenhum"
      }`
    );
    navigation.goBack();
  };

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
        <Text style={styles.headerTitle}>{pizza.nome}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitulo}>Adicione ou remova ingredientes</Text>

        <FlatList
          data={ingredientesExtras}
          keyExtractor={(item) => item.id}
          renderItem={renderIngrediente}
          contentContainerStyle={{ paddingBottom: 40 }}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalTexto}>Total:</Text>
          <Text style={styles.totalPreco}>R$ {precoTotal}</Text>
        </View>

        <TouchableOpacity style={styles.botaoConfirmar} onPress={confirmar}>
          <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
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
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  ingredienteItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  ingredienteSelecionado: {
    backgroundColor: "#d9fdd3",
    borderColor: "#4CAF50",
  },
  nomeIngrediente: { fontSize: 16, fontWeight: "500", color: "#333" },
  precoIngrediente: { fontSize: 14, color: "#666", marginTop: 4 },
  acaoIngrediente: {
    marginTop: 6,
    fontWeight: "bold",
    color: "#7B0909",
    textAlign: "right",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 15,
  },
  totalTexto: { fontSize: 18, fontWeight: "600" },
  totalPreco: { fontSize: 20, fontWeight: "bold", color: "#7B0909" },
  botaoConfirmar: {
    backgroundColor: "#7B0909",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotao: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
