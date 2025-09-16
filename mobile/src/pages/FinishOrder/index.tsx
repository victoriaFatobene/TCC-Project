import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FinishOrder() {
  const navigation = useNavigation<any>(); // <any> simplifica a tipagem

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pedido Finalizado!</Text>
        <Text style={styles.message}>Obrigado pela sua compra.</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate("Home")} // substitua "Home" pelo nome da sua tela inicial
        >
          <Text style={styles.buttonText}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  content: { alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  message: { fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: "#FF6347", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
