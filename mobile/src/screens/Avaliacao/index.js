// src/screens/Avaliacao/index.js
import React, { useState } from "react";
import {
  // MODIFICAÇÃO 1: Trocamos SafeAreaView por View e adicionamos StatusBar
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
// MODIFICAÇÃO 2: Importamos o hook da área segura
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Avaliacao({ navigation }) {
  const [rating, setRating] = useState(0);
  // MODIFICAÇÃO 3: Pegamos os valores da área segura
  const insets = useSafeAreaInsets();

  const handleSendRating = () => {
    if (rating === 0) {
      Alert.alert("Atenção", "Por favor, selecione uma quantidade de estrelas.");
      return;
    }
    Alert.alert(
      "Obrigado!",
      `Sua avaliação de ${rating} estrela(s) foi enviada com sucesso!`
    );

    navigation.navigate("HomeScreen");
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text style={i <= rating ? styles.starSelected : styles.star}>★</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    // MODIFICAÇÃO 4: Usamos uma View normal como container
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* MODIFICAÇÃO 5: Adicionamos o cabeçalho padronizado */}
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avaliar Pedido</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Pedido Finalizado!</Text>
        <Text style={styles.subtitle}>O que achou do nosso serviço?</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
        <TouchableOpacity style={styles.button} onPress={handleSendRating}>
          <Text style={styles.buttonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // MODIFICAÇÃO 6: Ajustamos o container para o novo layout
  container: { flex: 1, backgroundColor: "#FFF8E7" },

  // MODIFICAÇÃO 7: Adicionamos os estilos do cabeçalho
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

  content: {
    flex: 1, // Faz o conteúdo ocupar o espaço restante
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subtitle: { fontSize: 18, marginBottom: 30, color: "#555" },
  starsContainer: { flexDirection: "row", marginBottom: 40 },
  star: { fontSize: 50, color: "#ccc", marginHorizontal: 5 },
  starSelected: { fontSize: 50, color: "#FFD700", marginHorizontal: 5 },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});