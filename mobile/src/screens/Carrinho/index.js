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

function Carrinho({ navigation }) {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((total, p) => total + (p.preco || 0) * (p.quantidade || 0), 0);
  const insets = useSafeAreaInsets();

  const finalizarPedido = () => {
    Alert.alert(
      "Confirmar Pedido",
      `Total: R$ ${subtotal.toFixed(2)}. Deseja finalizar?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          // --- A CORREÇÃO ESTÁ AQUI ---
          // Com o novo App.tsx, a navegação para Pagamento é direta
          onPress: () => navigation.navigate('Pagamento') 
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(item.id)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantidade}</Text>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Text style={styles.remove}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />
      
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Carrinho 🛒</Text>
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
            keyExtractor={item => item.id.toString()}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#7B0909', 
    paddingBottom: 15, 
    paddingHorizontal: 15 
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  scrollContainer: { padding: 20, paddingBottom: 20 },
  card: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 15, padding: 15, marginBottom: 15, alignItems: "center", elevation: 3 },
  image: { width: 70, height: 70, borderRadius: 12, marginRight: 15 },
  cardContent: { flex: 1 },
  name: { fontSize: 18, fontWeight: "600" },
  price: { fontSize: 16, color: "#888", marginVertical: 5 },
  controls: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  button: { backgroundColor: "#E53935", width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  quantity: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  remove: { marginLeft: 15, color: "#FF5252", fontWeight: "600" },
  footer: { padding: 20, borderTopWidth: 1, borderColor: "#EEE", backgroundColor: "#FFF" },
  subtotal: { fontSize: 20, fontWeight: "600", marginBottom: 15 },
  checkoutButton: { backgroundColor: "#4CAF50", paddingVertical: 15, borderRadius: 12, alignItems: "center" },
  checkoutText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 22, color: '#333', marginBottom: 20, textAlign: 'center' },
  browseText: { fontSize: 18, color: '#7B0909', textDecorationLine: 'underline', fontWeight: 'bold' },
});

export default Carrinho;