import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Avaliacao({ navigation }) {
  const [rating, setRating] = useState(0); // 0 a 5

  // Função para renderizar estrelas
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Avalie nosso serviço!</Text>

      <View style={styles.starsContainer}>{renderStars()}</View>

      <Text style={styles.text}>{rating > 0 ? `Você deu ${rating} estrela(s)` : "Escolha sua avaliação"}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={styles.buttonText}>Voltar para Tela Inicial</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E7", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#333", textAlign: "center" },
  starsContainer: { flexDirection: "row", marginBottom: 20 },
  star: { fontSize: 50, color: "#ccc", marginHorizontal: 5 },
  starSelected: { fontSize: 50, color: "#FFD700", marginHorizontal: 5 },
  text: { fontSize: 18, marginBottom: 40, color: "#555" },
  button: { backgroundColor: "#4CAF50", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 12 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
