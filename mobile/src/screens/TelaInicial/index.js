import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TelaInicial({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.headerEmoji}>🍕</Text>
          <Text style={styles.headerTitle}>Cardápio</Text>
          <Text style={styles.headerSubtitle}>
            Escolha, saboreie e se apaixone ❤️
          </Text>
        </View>

        {/* Seções do cardápio */}
        <View style={styles.menuContainer}>
          {/* PIZZAS */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Pizzas')}
          >
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Pizzas</Text>
            <Text style={styles.cardSubtitle}>Sabores irresistíveis</Text>
          </TouchableOpacity>

          {/* BEBIDAS (imagem local) */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Bebidas')}
          >
            <Image
              source={require('../../assets/images/iconrefri.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Bebidas</Text>
            <Text style={styles.cardSubtitle}>Para refrescar o momento</Text>
          </TouchableOpacity>

          {/* SOBREMESAS (imagem local) */}
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Sobremesas')}
          >
            <Image
              source={require('../../assets/images/iconsorvete.jpg')}
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
    backgroundColor: '#FFFDF6',
  },

  header: {
    alignItems: 'center',
    backgroundColor: '#7C1D26',
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#FFECD1',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },
  headerSubtitle: {
    color: '#FFF9EE',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    opacity: 0.9,
    marginTop: 4,
  },

  menuContainer: {
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    borderWidth: 1,
    borderColor: '#F3EDE2',
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: '#7C1D26',
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#555',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
