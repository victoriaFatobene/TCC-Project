// src/screens/Pagamento/index.js
import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

function Pagamento({ navigation }) {
  const [selected, setSelected] = useState(null); // ✅ corrigido (sem TypeScript)

  const confirmarPagamento = () => {
    if (!selected) {
      Alert.alert("Atenção", "Selecione uma forma de pagamento.");
      return;
    }

    Alert.alert(
      "Confirmação",
      `Pagamento selecionado: ${selected}. Deseja confirmar?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            // --- Redireciona para Avaliação ---
            navigation.navigate("Menu", { screen: "Avaliacao" });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Escolha a forma de pagamento</Text>

      <TouchableOpacity
        style={[styles.option, selected === "Cartão" && styles.selected]}
        onPress={() => setSelected("Cartão")}
      >
        <Text style={styles.optionText}>💳 Cartão</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selected === "Dinheiro" && styles.selected]}
        onPress={() => setSelected("Dinheiro")}
      >
        <Text style={styles.optionText}>💵 Dinheiro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selected === "Pix" && styles.selected]}
        onPress={() => setSelected("Pix")}
      >
        <Text style={styles.optionText}>⚡ Pix</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmButton} onPress={confirmarPagamento}>
        <Text style={styles.confirmText}>Confirmar Pagamento</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  option: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  selected: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  optionText: { fontSize: 18, color: "#333" },
  confirmButton: {
    marginTop: 30,
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
});

export default Pagamento;
