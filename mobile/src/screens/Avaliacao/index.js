import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  TextInput, // 1. Importar o TextInput
  ActivityIndicator, // 2. Importar o ActivityIndicator
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Crypto from 'expo-crypto'; // 3. Importar o Crypto para gerar ID
import { supabase } from "../../services/supabase"; // 4. Importar o Supabase

export default function Avaliacao({ navigation, route }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); // 5. Estado para o comentário
  const [loading, setLoading] = useState(false); // 6. Estado de loading
  const insets = useSafeAreaInsets();
  
  // 7. Receber o ID do pedido que veio da tela anterior
  const { orderId } = route.params;

  const handleSendRating = async () => {
    if (rating === 0) {
      Alert.alert("Atenção", "Por favor, selecione uma quantidade de estrelas.");
      return;
    }
    
    if (!orderId) {
       Alert.alert("Erro", "ID do pedido não encontrado. Tente novamente.");
       return;
    }

    setLoading(true);

    const reviewData = {
      id: Crypto.randomUUID(), // Gera um ID único para a avaliação
      rating: rating,
      comment: comment,
      orderId: orderId,
      // createdAt é preenchido pelo Supabase
    };

    // 8. Enviar os dados para a tabela 'reviews'
    const { error } = await supabase.from('reviews').insert(reviewData);

    setLoading(false);

    if (error) {
      Alert.alert("Erro", "Não foi possível enviar sua avaliação. Tente novamente.");
      console.error("Erro ao salvar review:", error.message);
    } else {
      Alert.alert(
        "Obrigado!",
        `Sua avaliação de ${rating} estrela(s) foi enviada com sucesso!`
      );
      navigation.popToTop();
    }
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* Cabeçalho */}
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

        {/* 9. Campo de Comentário Adicionado */}
        <TextInput
          style={styles.commentInput}
          placeholder="Deixe um comentário (opcional)"
          placeholderTextColor="#999"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSendRating}
          disabled={loading} // Desabilita o botão enquanto salva
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Enviar Avaliação</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8E7" },
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
    flex: 1,
    justifyContent: "center",
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
  starsContainer: { flexDirection: "row", marginBottom: 30 }, // Aumentei a margem
  star: { fontSize: 50, color: "#ccc", marginHorizontal: 5 },
  starSelected: { fontSize: 50, color: "#FFD700", marginHorizontal: 5 },
  
  // 10. Estilo para o campo de comentário
  commentInput: {
    backgroundColor: '#FFF',
    width: '100%',
    minHeight: 100,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
    minWidth: '60%', // Largura mínima
    alignItems: 'center', // Centralizar o ActivityIndicator
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});