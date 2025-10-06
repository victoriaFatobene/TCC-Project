import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

export default function TelaInicial({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F0" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🍕 Cardápio</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pizzas')}>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wU2WsSAm3N/lbwvpb7i_expires_30_days.png',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Pizzas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Bebidas')}>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wU2WsSAm3N/9bzt8nk1_expires_30_days.png',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Bebidas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Sobremesas')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2917/2917631.png',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Sobremesas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8F0', // fundo bege claro, aconchegante
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#B02A30', // vermelho mais suave
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#FFF8F0',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  menuContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
    elevation: 5,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardImage: {
    width: 90,
    height: 90,
    marginRight: 20,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: '#B02A30',
    fontSize: 24,
    fontWeight: '700',
  },
});
