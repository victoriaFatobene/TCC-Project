// src/screens/Avaliacao/index.js
import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function Avaliacao({ navigation }) {
  const [rating, setRating] = useState(0);

  // --- FUNÇÃO ATUALIZADA ---
  const handleSendRating = () => {
    if (rating === 0) {
      Alert.alert("Atenção", "Por favor, selecione uma quantidade de estrelas.");
      return;
    }
    Alert.alert("Obrigado!", `Sua avaliação de ${rating} estrela(s) foi enviada com sucesso!`);
    
    // Navega para a primeira tela do menu principal
    navigation.navigate('HomeScreen'); 
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
    <SafeAreaView style={styles.container}>
      {/* O header antigo foi removido para focar no fluxo */}
      <View style={styles.content}>
        <Text style={styles.title}>Pedido Finalizado!</Text>
        <Text style={styles.subtitle}>O que achou do nosso serviço?</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
        <TouchableOpacity style={styles.button} onPress={handleSendRating}>
          <Text style={styles.buttonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos atualizados para a nova aparência
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E7", justifyContent: 'center' },
  content: { alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#333", textAlign: "center" },
  subtitle: { fontSize: 18, marginBottom: 30, color: '#555' },
  starsContainer: { flexDirection: "row", marginBottom: 40 },
  star: { fontSize: 50, color: "#ccc", marginHorizontal: 5 },
  starSelected: { fontSize: 50, color: "#FFD700", marginHorizontal: 5 },
  button: { backgroundColor: "#4CAF50", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 12, elevation: 3 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});