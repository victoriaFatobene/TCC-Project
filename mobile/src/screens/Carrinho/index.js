import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  FlatList, 
  Image, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MUDANÇA: Importar a fonte e ícones ---
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { Ionicons } from "@expo/vector-icons";

function Carrinho({ navigation }) {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();
  
  const subtotal = cartItems.reduce((total, p) => total + (p.precoFinal || p.preco || 0) * (p.quantidade || 0), 0);
  
  const insets = useSafeAreaInsets();

  // --- MUDANÇA: Carregar a fonte ---
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  const finalizarPedido = () => {
    Alert.alert(
      "Confirmar Pedido",
      `Total: R$ ${subtotal.toFixed(2)}. Deseja finalizar?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => navigation.navigate('Pagamento') 
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    // --- MUDANÇA: Estilo do card ---
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.image} />
      
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        
        <Text style={styles.price}>R$ {(item.precoFinal || item.preco).toFixed(2)}</Text>
        
        {item.extras && item.extras.length > 0 && (
          <Text style={styles.extrasText}>
            Extras: {item.extras.map(e => e.name).join(', ')}
          </Text>
        )}
        
        {item.observacoes && (
          <Text style={styles.obsText}>
            Obs: {item.observacoes}
          </Text>
        )}

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(item.id, item.extras, item.observacoes)}>
            <Ionicons name="remove" size={18} color="#FFECD1" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantidade}</Text>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
            <Ionicons name="add" size={18} color="#FFECD1" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id, item.extras, item.observacoes)}>
            <Text style={styles.remove}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Função para criar uma chave única
  const criarChaveUnica = (item) => {
    const extrasId = item.extras ? item.extras.map(e => e.id).join('-') : '';
    return `${item.id}-${extrasId}-${item.observacoes || ''}`;
  };

  if (!fontsLoaded) {
    return null; // Aguarda a fonte carregar
  }

  return (
    <View style={styles.container}>
      {/* --- MUDANÇA: Cor do StatusBar --- */}
      <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />
      
      {/* --- MUDANÇA: Cabeçalho com o novo estilo --- */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Menu')} 
          style={[styles.backButton, { top: insets.top + 12 }]} // Alinha com o 'insets'
        >
          <Ionicons name="chevron-back" size={28} color="#FFECD1" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Meu Carrinho</Text>
        </View>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Menu', { screen: 'HomeScreen' })}>
            <Text style={styles.browseText}>Navegar pelo cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${criarChaveUnica(item)}-${index}`}
            contentContainerStyle={styles.scrollContainer}
          />
          <View style={styles.footer}>
            <Text style={styles.subtotal}>Subtotal: R$ {subtotal.toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={finalizarPedido}>
              <Text style={styles.checkoutText}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

// --- MUDANÇA: Estilos atualizados ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFDF6' // Cor de fundo principal
  },
  header: {
    backgroundColor: '#7C1D26', // Cor do cabeçalho principal
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 5,
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: "DancingScript_700Bold", // Fonte
    color: "#FFECD1", // Cor
    fontSize: 40,
  },
  scrollContainer: { padding: 22, paddingBottom: 20 },
  card: { 
    flexDirection: "row", 
    backgroundColor: "#FFFFFF", 
    borderRadius: 24, // Borda
    padding: 15, 
    marginBottom: 15, 
    alignItems: "center", 
    elevation: 6, // Sombra
    borderWidth: 1,
    borderColor: '#F3EDE2', // Borda
  },
  image: { width: 70, height: 70, borderRadius: 12, marginRight: 15 },
  cardContent: { flex: 1 },
  name: { 
    fontSize: 18, 
    fontWeight: "600",
    color: '#7C1D26', // Cor principal
  },
  price: { fontSize: 16, color: "#555", marginVertical: 5 },
  extrasText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  obsText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  controls: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  button: { 
    backgroundColor: "#7C1D26", // Cor principal
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" }, // Mantido
  quantity: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold', color: '#333' },
  remove: { marginLeft: 15, color: "#E53935", fontWeight: "600" },
  footer: { 
    padding: 20, 
    borderTopWidth: 1, 
    borderColor: "#F3EDE2", // Borda
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },
  subtotal: { 
    fontSize: 22, // Maior
    fontWeight: "bold", 
    marginBottom: 15,
    color: '#7C1D26', // Cor principal
    textAlign: 'right',
  },
  checkoutButton: { 
    backgroundColor: "#4CAF50", // Verde
    paddingVertical: 18, // Mais padding
    borderRadius: 12, // Borda
    alignItems: "center",
    elevation: 3,
  },
  checkoutText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#FFFDF6' },
  emptyText: { 
    fontSize: 22, 
    color: '#7C1D26', // Cor principal
    marginBottom: 20, 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  browseText: { 
    fontSize: 18, 
    color: '#555', 
    textDecorationLine: 'underline', 
    fontWeight: 'bold' 
  },
});

export default Carrinho;