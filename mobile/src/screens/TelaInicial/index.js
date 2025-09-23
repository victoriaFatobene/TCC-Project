import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function TelaInicial({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cardápio</Text>
        </View>

        {/* Container principal para os botões em coluna única */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pizzas')}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wU2WsSAm3N/lbwvpb7i_expires_30_days.png' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Pizzas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Bebidas')}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wU2WsSAm3N/9bzt8nk1_expires_30_days.png' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Bebidas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Sobremesas')}>
            {/* Você pode reativar a imagem local se quiser */}
            {/* <Image
              source={require('../../../assets/images/sobremesa.png')}
              style={styles.cardImage}
            /> */}
            <Text style={styles.cardTitle}>Sobremesas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos ajustados para uma aparência melhor em coluna única
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1, backgroundColor: '#7B0909' },
  header: { alignItems: 'center', backgroundColor: '#5E0808', borderBottomWidth: 1, paddingVertical: 12 },
  headerTitle: { color: '#EEFF00', fontSize: 40, fontWeight: 'bold' },
  menuContainer: { 
    padding: 20,
    alignItems: 'center', // Centraliza os cards
  },
  card: { 
    backgroundColor: '#FFF', 
    borderColor: '#000', 
    borderWidth: 2, 
    borderRadius: 15, 
    padding: 15, 
    alignItems: 'center', 
    marginBottom: 20, 
    width: '100%', // Ocupa a largura total
    elevation: 4,
    flexDirection: 'row', // Alinha a imagem e o texto lado a lado
  },
  cardImage: { 
    width: 100, 
    height: 100, 
    marginRight: 20,
    resizeMode: 'contain' 
  },
  cardTitle: { 
    color: '#5E0808', 
    fontSize: 24, 
    fontWeight: 'bold', 
  },
});