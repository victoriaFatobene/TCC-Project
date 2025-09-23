import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Bebidas({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bebidas</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Refrigerantes')}>
          <Text style={styles.menuButtonText}>🥤 Refrigerantes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Sucos')}>
          <Text style={styles.menuButtonText}>🍊 Sucos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Alcoolicas')}>
          <Text style={styles.menuButtonText}>🍺 Alcoólicas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Vinhos')}>
          <Text style={styles.menuButtonText}>🍷 Vinhos</Text>
        </TouchableOpacity>
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
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  menuButton: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20, elevation: 4 },
  menuButtonText: { fontSize: 20, color: '#7B0909', fontWeight: 'bold' },
});