// src/pages/Order/index.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

type Order = {
  id: string;
  name: string;
  status: "pendente" | "finalizado";
};

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([
    { id: "1", name: "Pedido #1", status: "pendente" },
    { id: "2", name: "Pedido #2", status: "finalizado" },
    { id: "3", name: "Pedido #3", status: "pendente" },
  ]);

  const handlePress = (id: string) => {
    // Aqui você poderia navegar para detalhes ou mudar status
    console.log("Clicou no pedido:", id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              item.status === "finalizado" && styles.finishedCard,
            ]}
            onPress={() => handlePress(item.id)}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text
              style={[
                styles.status,
                item.status === "finalizado"
                  ? styles.finished
                  : styles.pending,
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum pedido encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  finishedCard: {
    backgroundColor: "#E8F5E9",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
  pending: {
    color: "#FF9800",
  },
  finished: {
    color: "#4CAF50",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
});
