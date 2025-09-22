import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

// --- Componente da Tela Inicial (em JavaScript) ---
// Note que removemos a parte de tipagem (Props, etc.)
// e recebemos { navigation } diretamente dos props.
function TelaInicial({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cardápio</Text>
        </View>

        <View style={styles.menuContainer}>
          {/* Coluna da Esquerda */}
          <View style={styles.menuColumn}>
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('Cardapio')}
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wU2WsSAm3N/lbwvpb7i_expires_30_days.png' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Pizzas</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('Bebidas')}
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wU2WsSAm3N/9bzt8nk1_expires_30_days.png' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Bebidas</Text>
            </TouchableOpacity>

            {/* Adicione outros itens aqui se necessário */}
          </View>
          
          {/* Coluna da Direita (exemplo) */}
          <View style={styles.menuColumn}>
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => alert('Navegar para Rodízios')} // Altere para navigation.navigate
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wU2WsSAm3N/v1oo72pc_expires_30_days.png' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitleBlack}>Rodízios</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.card} 
              onPress={() => alert('Navegar para Acompanhamentos')} // Altere para navigation.navigate
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wU2WsSAm3N/52xnhagk_expires_30_days.png' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitleBlack}>Acompanhamentos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Folha de Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#7B0909',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#5E0808',
    borderColor: '#000000',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#EEFF00',
    fontSize: 40,
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  menuColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: '#1F451A',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  cardImage: {
    width: 120,
    height: 112,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardTitleBlack: {
    color: '#000000',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TelaInicial;