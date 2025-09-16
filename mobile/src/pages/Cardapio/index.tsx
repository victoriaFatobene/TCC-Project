import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ListItem from "../../components/listItem";

type Produto = {
  id: string;
  title: string;
  subtitle?: string;
  price?: string;
  image?: string;
};

type Categoria = {
  id: string;
  title: string;
  produtos: Produto[];
};

const categorias: Categoria[] = [
  {
    id: "1",
    title: "Pizzas Salgadas",
    produtos: [
      { id: "1", title: "Margherita", subtitle: "Molho de tomate e muçarela", price: "R$ 30,00", image: "https://link.com/margherita.png" },
      { id: "2", title: "Calabresa", subtitle: "Calabresa, muçarela e cebola", price: "R$ 35,00", image: "https://link.com/calabresa.png" },
    ],
  },
  {
    id: "2",
    title: "Pizzas Doces",
    produtos: [
      { id: "3", title: "Chocolate", subtitle: "Chocolate ao leite", price: "R$ 25,00", image: "https://link.com/chocolate.png" },
      { id: "4", title: "Banana com Canela", subtitle: "Banana e canela", price: "R$ 25,00", image: "https://link.com/banana.png" },
    ],
  },
  {
    id: "3",
    title: "Pizzas Favoritas",
    produtos: [
      { id: "5", title: "Quatro Queijos", subtitle: "Muçarela, gorgonzola, provolone e parmesão", price: "R$ 40,00", image: "https://link.com/4queijos.png" },
    ],
  },
  {
    id: "4",
    title: "Bebidas",
    produtos: [
      { id: "6", title: "Coca-Cola 350ml", price: "R$ 5,00", image: "https://link.com/coca.png" },
      { id: "7", title: "Heineken 350ml", price: "R$ 8,00", image: "https://link.com/heineken.png" },
    ],
  },
  {
    id: "5",
    title: "Sobremesas",
    produtos: [
      { id: "8", title: "Pudim", price: "R$ 10,00", image: "https://link.com/pudim.png" },
      { id: "9", title: "Sorvete", price: "R$ 12,00", image: "https://link.com/sorvete.png" },
    ],
  },
  {
    id: "6",
    title: "Pizzas Veganas",
    produtos: [
      { id: "10", title: "Veggie", subtitle: "Tomate, cebola, pimentão e azeitonas", price: "R$ 32,00", image: "https://link.com/veggie.png" },
    ],
  },
];

export default function Cardapio() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);

  // Se clicar numa categoria, mostra os produtos
  if (categoriaSelecionada) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{categoriaSelecionada.title}</Text>
        <FlatList
          data={categoriaSelecionada.produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subtitle={item.subtitle}
              price={item.price}
              image={item.image}
            />
          )}
        />
        <Text style={styles.back} onPress={() => setCategoriaSelecionada(null)}>
          ← Voltar para categorias
        </Text>
      </View>
    );
  }

  // Tela de categorias
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem title={item.title} onPress={() => setCategoriaSelecionada(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9F9F9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  back: { color: "#4CAF50", marginTop: 20, fontSize: 16, fontWeight: "600" },
});
