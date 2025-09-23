// src/pages/VerMais/index.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function VerMais({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sobre Nós</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Nossa Pizzaria</Text>
        <Text style={styles.text}>
          Somos uma pizzaria familiar dedicada a trazer os melhores sabores para a sua mesa desde 2024. 
          Todos os nossos ingredientes são selecionados com carinho para garantir a máxima qualidade.
        </Text>
        <Text style={styles.text}>
          Agradecemos a sua preferência!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7B0909', paddingVertical: 15, paddingHorizontal: 10 },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  text: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 15 },
});