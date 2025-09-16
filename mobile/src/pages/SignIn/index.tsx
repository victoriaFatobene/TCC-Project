import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Logo com fallback em texto se não encontrar a imagem */}
      {(() => {
        try {
          return (
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          );
        } catch {
          return <Text style={styles.title}>🍕 Pizzaria Sabor Perfeito</Text>;
        }
      })()}

      <Text style={styles.title}>🍕 Pizzaria Sabor Perfeito</Text>
      <Text style={styles.subtitle}>
        Aberto todos os dias das 18h às 23h {"\n"}
        Rua das Flores, 123 - Centro
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Cardapio")}
      >
        <Text style={styles.buttonText}>Ver Cardápio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#E63946",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
