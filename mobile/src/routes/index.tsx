import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./app.routes";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Dashboard">;

export default function Dashboard() {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Order")}
      >
        <Text style={styles.buttonText}>Ver Pedidos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
