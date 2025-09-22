// src/screens/Avaliacao/index.js
import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function Avaliacao({ navigation }) {
  const [rating, setRating] = useState(0);

  const handleSendRating = () => {
    if (rating === 0) {
      Alert.alert("Atenção", "Por favor, selecione uma quantidade de estrelas.");
      return;
    }
    Alert.alert("Obrigado!", `Sua avaliação de ${rating} estrela(s) foi enviada com sucesso!`);
    navigation.goBack();
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
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avalie-nos</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Gostou do nosso serviço?</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
        <TouchableOpacity style={styles.button} onPress={handleSendRating}>
          <Text style={styles.buttonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E7" },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7B0909', paddingVertical: 15, paddingHorizontal: 10 },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, color: "#333", textAlign: "center" },
  starsContainer: { flexDirection: "row", marginBottom: 40 },
  star: { fontSize: 50, color: "#ccc", marginHorizontal: 5 },
  starSelected: { fontSize: 50, color: "#FFD700", marginHorizontal: 5 },
  button: { backgroundColor: "#4CAF50", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 12, elevation: 3 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});