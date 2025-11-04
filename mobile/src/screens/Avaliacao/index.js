import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Crypto from 'expo-crypto'; 
import { supabase } from "../../services/supabase"; 
import { useAuth } from "../../contexts/AuthContext"; // 1. IMPORTAR O AUTH

export default function Avaliacao({ navigation, route }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const insets = useSafeAreaInsets();
  
  const { user } = useAuth(); // 2. PEGAR O USUÁRIO LOGADO
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
      id: Crypto.randomUUID(), 
      rating: rating,
      comment: comment,
      orderId: orderId,
      // 3. ADICIONAR O CLIENTID (se o usuário existir, senão, envia null)
      clientId: user ? user.id : null
    };

    // 4. Salvar na tabela 'reviews' (com 's' no final)
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
          disabled={loading} 
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

// ... (Seus estilos estão corretos) ...
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
  starsContainer: { flexDirection: "row", marginBottom: 30 }, 
  star: { fontSize: 50, color: "#ccc", marginHorizontal: 5 },
  starSelected: { fontSize: 50, color: "#FFD700", marginHorizontal: 5 },
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
    minWidth: '60%', 
    alignItems: 'center', 
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});