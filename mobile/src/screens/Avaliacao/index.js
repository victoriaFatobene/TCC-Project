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
  // --- MUDANÇA: Adicionar ScrollView e KAV para o teclado ---
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Crypto from 'expo-crypto'; 
import { supabase } from "../../services/supabase"; 
import { useAuth } from "../../contexts/AuthContext"; 

// --- MUDANÇA: Importar a fonte e ícones ---
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { Ionicons } from "@expo/vector-icons";

export default function Avaliacao({ navigation, route }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const insets = useSafeAreaInsets();
  
  const { user } = useAuth(); 
  const { orderId } = route.params;

  // --- MUDANÇA: Carregar a fonte ---
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

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
      clientId: user ? user.id : null
    };

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

  // --- MUDANÇA: Aguarda a fonte carregar ---
  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* --- MUDANÇA: Cor do StatusBar --- */}
          <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />
          
          {/* --- MUDANÇA: Cabeçalho com o novo estilo --- */}
          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={[styles.backButton, { top: insets.top + 12 }]} 
            >
              <Ionicons name="chevron-back" size={28} color="#FFECD1" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Avaliar Pedido</Text>
            </View>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- MUDANÇA: Estilos atualizados ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFDF6' // Cor de fundo principal
  },
  header: {
    backgroundColor: '#7C1D26', // Cor do cabeçalho principal
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 5,
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: "DancingScript_700Bold", // Fonte
    color: "#FFECD1", // Cor
    fontSize: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 22, // Padding padrão
    paddingTop: 40, // Espaço do topo
  },
  title: {
    fontSize: 28, // Maior
    fontWeight: "bold",
    marginBottom: 10,
    color: "#7C1D26", // Cor principal
    textAlign: "center",
  },
  subtitle: { fontSize: 18, marginBottom: 30, color: "#555", textAlign: 'center' },
  starsContainer: { flexDirection: "row", marginBottom: 30 }, 
  star: { fontSize: 50, color: "#ccc", marginHorizontal: 5 },
  starSelected: { fontSize: 50, color: "#FFC107", marginHorizontal: 5 }, // Dourado
  commentInput: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    minHeight: 120, // Mais altura
    borderColor: '#F3EDE2', // Borda
    borderWidth: 1,
    borderRadius: 12, // Borda
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 30,
    elevation: 2, // Sombra
  },
  button: {
    backgroundColor: "#7C1D26", // Cor principal
    paddingVertical: 18, // Mais padding
    borderRadius: 12, // Borda
    elevation: 3,
    width: '100%', // Largura total
    alignItems: 'center', 
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});