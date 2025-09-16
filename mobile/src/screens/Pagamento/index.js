import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

export default function Pagamento() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/gltqwj1n_expires_30_days.png" }}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Pagamento</Text>
        </View>

        {/* Seção Forma de Pagamento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento:</Text>

          {/* Opção Débito */}
          <TouchableOpacity style={styles.option}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/ev0py4g5_expires_30_days.png" }}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Débito</Text>
          </TouchableOpacity>

          {/* Opção Crédito */}
          <TouchableOpacity style={styles.option}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/na34xmsb_expires_30_days.png" }}
              style={styles.optionImage}
              resizeMode="contain"
            />
            <Text style={styles.optionText}>Crédito</Text>
          </TouchableOpacity>
        </View>

        {/* Imagem ilustrativa */}
        <View style={styles.illustrationContainer}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gdiRRrvLT5/du27216i_expires_30_days.png" }}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#6D1E1E" },
  scrollContent: { padding: 16, paddingBottom: 50 },
  header: { alignItems: "center", marginBottom: 30 },
  headerImage: { width: width * 0.25, height: width * 0.25, marginBottom: 12 },
  title: { color: "#EEFF00", fontSize: 36, fontWeight: "700" },

  section: {
    backgroundColor: "#5B0000",
    borderRadius: 20,
    padding: 16,
    marginBottom: 30,
  },
  sectionTitle: { color: "#FFF", fontSize: 28, marginBottom: 16, fontWeight: "600" },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6D1E1E",
    borderColor: "#FFF89E",
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  optionImage: { width: 60, height: 60, marginRight: 16 },
  optionText: { color: "#FFF89E", fontSize: 24, fontWeight: "600" },

  illustrationContainer: { alignItems: "center" },
  illustration: { width: width * 0.7, height: width * 1.1 },
});

