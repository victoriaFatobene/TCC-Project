// src/screens/TelaInicial/index.js
import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function TelaInicial({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cardápio</Text>
        </View>

        <View style={styles.menuContainer}>
          {/* Coluna da Esquerda */}
          <View style={styles.menuColumn}>
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
              {/* IMAGEM TEMPORARIAMENTE DESATIVADA */}
              {/* <Image
                source={require('../../../assets/images/sobremesa.png')}
                style={styles.cardImage}
              />
              */}
              <Text style={styles.cardTitle}>Sobremesas</Text>
            </TouchableOpacity>
          </View>
          
          {/* Coluna da Direita */}
          <View style={styles.menuColumn}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Avaliacao')}>
               {/* IMAGEM TEMPORARIAMENTE DESATIVADA */}
               {/*
               <Image
                source={require('../../../assets/images/avaliacao.png')}
                style={styles.cardImage}
              />
              */}
              <Text style={styles.cardTitleBlack}>Avaliação</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('VerMais')}>
               {/* IMAGEM TEMPORARIAMENTE DESATIVADA */}
               {/*
               <Image
                source={require('../../../assets/images/vermais.png')}
                style={styles.cardImage}
              />
              */}
              <Text style={styles.cardTitleBlack}>Ver Mais</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (seus estilos continuam aqui)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1, backgroundColor: '#7B0909' },
  header: { alignItems: 'center', backgroundColor: '#5E0808', borderBottomWidth: 1, paddingVertical: 12 },
  headerTitle: { color: '#EEFF00', fontSize: 40, fontWeight: 'bold' },
  menuContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  menuColumn: { flex: 1, alignItems: 'center', paddingHorizontal: 5 },
  card: { backgroundColor: '#FFF', borderColor: '#000', borderWidth: 2, borderRadius: 15, padding: 10, alignItems: 'center', marginBottom: 20, width: '100%', elevation: 4, minHeight: 180, justifyContent: 'center' },
  cardImage: { width: 120, height: 112, marginBottom: 8, resizeMode: 'contain' },
  cardTitle: { color: '#5E0808', fontSize: 19, fontWeight: 'bold', textAlign: 'center' },
  cardTitleBlack: { color: '#000000', fontSize: 19, fontWeight: 'bold', textAlign: 'center' },
});