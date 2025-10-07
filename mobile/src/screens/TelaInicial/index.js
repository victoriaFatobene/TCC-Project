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
// 1. Importamos a ferramenta para medir a área segura
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TelaInicial({ navigation }) {
  // 2. Pegamos o valor do espaçamento seguro (principalmente o do topo)
  const insets = useSafeAreaInsets();

  return (
    // Usamos uma View normal como container principal
    <View style={styles.container}>
      {/* 3. A StatusBar agora fica com o fundo vermelho e ícones claros */}
      <StatusBar barStyle="light-content" backgroundColor="#B02A30" />

      {/* 4. O ScrollView volta a englobar tudo */}
      <ScrollView>
        {/* 5. A MÁGICA: Aplicamos o espaçamento do topo DINAMICAMENTE no estilo do header */}
        <View style={[styles.header, { paddingTop: insets.top + 5 }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  // Trocamos SafeAreaView por View aqui
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#B02A30',
    // O paddingTop será adicionado dinamicamente, mas mantemos o padding de baixo
    paddingBottom: 20, 
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