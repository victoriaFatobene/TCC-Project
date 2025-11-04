import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";

// --- 1. NOVA MUDANÇA: Importar os ícones ---
import { Ionicons } from "@expo/vector-icons";

export default function TelaInicial({ navigation }) {
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />

      {/* Cabeçalho fixo */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        
        {/* --- 2. NOVA MUDANÇA: Botão de Perfil Adicionado --- */}
        <TouchableOpacity
          style={[styles.profileButton, { top: insets.top + 15 }]} // Usa o 'insets' para alinhar
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={34} color="#FFECD1" />
        </TouchableOpacity>
        
        <Text style={styles.headerEmoji}>🍕</Text>
        <Text style={styles.headerTitle}>Bravazatta</Text>
        <Text style={styles.headerSubtitle}>
          Escolha, saboreie e se apaixone ❤️
        </Text>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.menuContainer}>
          {/* PIZZAS */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Pizzas")}
          >
            <Image
              source={require("../../assets/images/pizzainicio.webp")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Pizzas</Text>
            <Text style={styles.cardSubtitle}>Sabores irresistíveis</Text>
          </TouchableOpacity>

          {/* BEBIDAS */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Bebidas")}
          >
            <Image
              source={require("../../assets/images/bebidainicio.jpg")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Bebidas</Text>
            <Text style={styles.cardSubtitle}>
              Para refrescar o momento 🍹
            </Text>
          </TouchableOpacity>

          {/* SOBREMESAS */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Sobremesas")}
          >
            <Image
              source={require("../../assets/images/sobremesainicio.webp")}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Sobremesas</Text>
            <Text style={styles.cardSubtitle}>O doce final perfeito 🍨</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF6",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#7C1D26",
    paddingTop: 20, // 🔹 menos espaço em cima
    paddingBottom: 15, // 🔹 menos espaço embaixo
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  headerImage: {
    width: 200, // 🔹 aumentei o tamanho da logo
    height: 160,
    resizeMode: "contain",
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: "DancingScript_700Bold",
    color: "#FFECD1",
    fontSize: 46,
    marginTop: -70, // 🔹 aproxima o texto da logo
  },
  headerSubtitle: {
    color: "#FFF9EE",
    fontSize: 15,
    opacity: 0.9,
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  menuContainer: {
    paddingHorizontal: 22,
    paddingTop: 25,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 24,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    borderWidth: 1,
    borderColor: "#F3EDE2",
  },
  cardImage: {
    width: 160,
    height: 160,
    marginBottom: 16,
    borderRadius: 20,
    resizeMode: "cover",
  },
  cardTitle: {
    color: "#7C1D26",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#555",
    fontSize: 16,
    textAlign: "center",
  },
  
  // --- 3. NOVA MUDANÇA: Estilo do botão de perfil ---
  profileButton: {
    position: 'absolute',
    right: 22, // Distância da direita
    zIndex: 11, // Garante que ele fique sobre o cabeçalho
  },
});