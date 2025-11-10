import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, // Vamos manter o import, mas não usá-lo (ou podemos remover)
  Alert,
  ActivityIndicator,
  StatusBar,
  ScrollView, // Importante
  KeyboardAvoidingView, // Importante
  Platform // Importante
} from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';

import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";

export default function Pagamento({ navigation, route }) {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  
  const subtotal = cartItems.reduce((total, item) => total + (item.precoFinal || item.preco || 0) * (item.quantidade || 1), 0);
  
  const [metodo, setMetodo] = useState('dinheiro');
  const [cartoes, setCartoes] = useState([
    { id: '1', final: '1234', nome: 'Meu Cartão Fictício' },
  ]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  useEffect(() => {
    if (route.params?.novoCartao) {
      setCartoes(listaAnterior => [...listaAnterior, route.params.novoCartao]);
    }
  }, [route.params?.novoCartao]);

  // ... (handleFinalizarPedido está perfeito) ...
  const handleFinalizarPedido = async () => {
    if (metodo === 'cartao' && !cartaoSelecionado) {
      Alert.alert('Atenção', 'Por favor, selecione um cartão.');
      return;
    }

    setLoading(true);

    try {
      const timestamp = new Date().toISOString(); 

      const pedidoData = { 
        id: Crypto.randomUUID(), 
        table: 1,      
        name: user ? user.email : "Convidado",
        created_at: timestamp, 
        updated_at: timestamp,
        user_id: user ? user.id : null,
        total: subtotal,
        status_id: 1 
      };

      const { data: pedidoCriado, error: errorPedido } = await supabase
        .from('orders')
        .insert(pedidoData)
        .select()
        .single(); 

      if (errorPedido || !pedidoCriado) {
        console.error('ERRO NO PASSO 1 (orders):', errorPedido.message);
        throw errorPedido;
      }

      const itensParaInserir = cartItems.map(item => ({
        id: Crypto.randomUUID(),    
        orderId: pedidoCriado.id, 
        product_name: item.nome, 
        amount: item.quantidade,
        created_at: timestamp,    
        updated_at: timestamp,
        extras: item.extras || [],
        observacoes: item.observacoes || null,
        item_status_id: 1 
      }));

      const { error: errorItens } = await supabase
        .from('items') 
        .insert(itensParaInserir);

      if (errorItens) {
        console.error('ERRO NO PASSO 2 (items):', errorItens.message); 
        throw errorItens;
      }

      setLoading(false);
      clearCart();
      
      const dadosParaStatus = {
        ...pedidoCriado, 
        itens: cartItems.map(item => ({ 
          nome: item.nome, 
          qtd: item.quantidade,
          extras: item.extras || [],
          observacoes: item.observacoes || null,
          item_status_id: 1 
        })),
        total: subtotal,
      };
      
      navigation.navigate('StatusPedido', { pedido: dadosParaStatus });

    } catch (error) {
      setLoading(false);
      console.error("Erro ao finalizar pedido (Supabase):", error.message); 
      Alert.alert(
         "Erro", 
         `Não foi possível criar o pedido. Mensagem: ${error.message}`
       );
    }
  };
  
  if (!fontsLoaded) {
    return null; // Aguarda a fonte carregar
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />
          
          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={[styles.backButton, { top: insets.top + 12 }]} 
            >
              <Ionicons name="chevron-back" size={28} color="#FFECD1" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Pagamento</Text>
            </View>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.title}>Escolha a forma de pagamento</Text>
            <View style={styles.methodSelector}>
              <TouchableOpacity
                style={[styles.methodButton, metodo === 'dinheiro' && styles.methodSelected]}
                onPress={() => setMetodo('dinheiro')}>
                <Ionicons name="cash-outline" size={24} color={metodo === 'dinheiro' ? '#FFF' : '#7C1D26'} />
                <Text style={[styles.methodText, metodo === 'dinheiro' && styles.methodTextSelected]}>Dinheiro</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.methodButton, metodo === 'cartao' && styles.methodSelected]}
                onPress={() => setMetodo('cartao')}>
                <Ionicons name="card-outline" size={24} color={metodo === 'cartao' ? '#FFF' : '#7C1D26'} />
                <Text style={[styles.methodText, metodo === 'cartao' && styles.methodTextSelected]}>Cartão</Text>
              </TouchableOpacity>
            </View>
            
            {/* --- A CORREÇÃO ESTÁ AQUI --- */}
            {metodo === 'cartao' && (
              <View style={styles.cardSection}>
                <Text style={styles.sectionTitle}>Meus Cartões</Text>
                
                {/* Trocamos <FlatList> por um .map() */}
                {cartoes.map((item) => (
                  <TouchableOpacity 
                    key={item.id} // .map() precisa de uma 'key'
                    style={[styles.cardItem, cartaoSelecionado?.id === item.id && styles.cardSelected]}
                    onPress={() => setCartaoSelecionado(item)}
                  >
                    <Ionicons name="card" size={24} color="#4CAF50" />
                    <Text style={styles.cardText}>Final •••• {item.final}</Text>
                    {cartaoSelecionado?.id === item.id && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CadastroCartao')}>
                  <Text style={styles.addButtonText}>Adicionar Novo Cartão</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* --- FIM DA CORREÇÃO --- */}
            
            <TouchableOpacity style={styles.confirmButton} onPress={handleFinalizarPedido} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.confirmButtonText}>Finalizar Pedido</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ... (Seus estilos estão perfeitos, não precisam de mudança)
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFDF6' 
  },
  header: {
    backgroundColor: '#7C1D26', 
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
    fontFamily: "DancingScript_700Bold", 
    color: "#FFECD1", 
    fontSize: 40,
  },
  content: { 
    flex: 1, 
    padding: 22, 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20,
    color: '#7C1D26', 
  },
  methodSelector: { flexDirection: 'row', marginBottom: 30 },
  methodButton: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 15, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    marginHorizontal: 5,
    elevation: 3, 
    borderWidth: 1,
    borderColor: '#F3EDE2', 
  },
  methodSelected: { 
    backgroundColor: '#7C1D26', 
    borderColor: '#7C1D26',
  },
  methodText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginLeft: 10,
    color: '#7C1D26', 
  },
  methodTextSelected: { color: '#FFF' }, 
  cardSection: { flex: 1 },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#7C1D26', 
  },
  cardItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#F3EDE2', 
    elevation: 2,
  },
  cardSelected: { 
    borderColor: '#4CAF50', 
    borderWidth: 2,
  },
  cardText: { flex: 1, marginLeft: 15, fontSize: 16, color: '#333' },
  addButton: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#7C1D26', 
  },
  addButtonText: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#7C1D26', 
  },
  confirmButton: { 
    backgroundColor: '#4CAF50', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 'auto', 
    elevation: 3,
  },
  confirmButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});