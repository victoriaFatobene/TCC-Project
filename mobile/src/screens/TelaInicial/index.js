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
        {/* Header com estilo moderno */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.headerEmoji}>🍕</Text>
          <Text style={styles.headerTitle}>Cardápio</Text>
          <Text style={styles.headerSubtitle}>
            Escolha, saboreie e se apaixone ❤️
          </Text>
        </View>

        {/* Cards refinados */}
        <View style={styles.menuContainer}>
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

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Bebidas')}
          >
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/924/924514.png',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Bebidas</Text>
            <Text style={styles.cardSubtitle}>Para refrescar o momento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Sobremesas')}
          >
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/415/415682.png',
              }}
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

  // HEADER
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
  headerTitle: {
    color: '#FFECD1',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold', // ou Quicksand-Bold, se instalada
  },
  headerSubtitle: {
    color: '#FFF9EE',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    opacity: 0.9,
    marginTop: 4,
  },

  // MENU
  menuContainer: {
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  // CARD
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
