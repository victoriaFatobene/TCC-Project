// src/pages/Pagamento/index.js
import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function Pagamento({ navigation }) {
  const handlePaymentMethod = (method) => {
    Alert.alert("Forma de Pagamento", `Você selecionou: ${method}`);
    // Futuramente, aqui você pode navegar para uma tela de detalhes do cartão, etc.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Escolha a forma de pagamento:</Text>
        <TouchableOpacity style={styles.option} onPress={() => handlePaymentMethod('Débito')}>
          <Text style={styles.optionText}>Débito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handlePaymentMethod('Crédito')}>
          <Text style={styles.optionText}>Crédito</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#6D1E1E" },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#5B0000', paddingVertical: 15, paddingHorizontal: 10 },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: '#EEFF00', fontSize: 24, fontWeight: 'bold' },
  headerTitle: { color: '#EEFF00', fontSize: 22, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  sectionTitle: { color: "#FFF", fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: "600" },
  option: { backgroundColor: "#5B0000", borderRadius: 16, padding: 20, marginBottom: 16, alignItems: 'center' },
  optionText: { color: "#FFF89E", fontSize: 22, fontWeight: "600" },
});