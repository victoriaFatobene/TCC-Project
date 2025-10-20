import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  Alert,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Pagamento({ navigation, route }) {
  const { cartItems, clearCart } = useCart();
  const subtotal = cartItems.reduce((total, item) => total + (item.preco || 0) * (item.quantidade || 1), 0);
  
  const [metodo, setMetodo] = useState('dinheiro');
  const [cartoes, setCartoes] = useState([
    { id: '1', final: '1234', nome: 'Meu Cartão Fictício' },
  ]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (route.params?.novoCartao) {
      setCartoes(listaAnterior => [...listaAnterior, route.params.novoCartao]);
    }
  }, [route.params?.novoCartao]);

  // --- FUNÇÃO DE FINALIZAR PEDIDO (A VERSÃO FINAL) ---
  const handleFinalizarPedido = async () => {
    if (metodo === 'cartao' && !cartaoSelecionado) {
      Alert.alert('Atenção', 'Por favor, selecione um cartão.');
      return;
    }

    setLoading(true);

    try {
      // --- PASSO 1: CRIAR O PEDIDO (COM TODAS AS CORREÇÕES) ---
      
      // A SUA IMAGEM (image_309c82.png) PROVA QUE ESTE É O FORMATO:
      const pedidoData = { 
        table: 1,      // <-- O campo obrigatório (int4)
        status: false, // <-- O campo booleano (bool)
        draft: false,  // <-- O campo booleano (bool)
        name: "Cliente App" // O campo de texto (text)
      };

      // Insere o pedido na tabela 'orders'
      const { data: pedidoCriado, error: errorPedido } = await supabase
        .from('orders')
        .insert(pedidoData)
        .select()
        .single(); 

      if (errorPedido || !pedidoCriado) {
        console.error('ERRO NO PASSO 1 (orders):', errorPedido);
        throw errorPedido;
      }

      // --- PASSO 2: SALVAR OS ITENS DO PEDIDO (COM TODAS AS CORREÇÕES) ---
      
      const itensParaInserir = cartItems.map(item => ({
        order_id: pedidoCriado.id, // Correção do snake_case
        product_id: item.id,      // Correção do snake_case
        amount: item.quantidade,
      }));

      // Correção do nome da tabela (plural)
      const { error: errorItens } = await supabase
        .from('items') 
        .insert(itensParaInserir);

      if (errorItens) {
        console.error('ERRO NO PASSO 2 (items):', errorItens);
        throw errorItens;
      }

      // --- PASSO 3: SUCESSO! ---
      
      setLoading(false);
      clearCart();
      
      const dadosParaStatus = {
        ...pedidoCriado, // Contém id, table, status (false), draft (false)
        itens: cartItems.map(item => ({ nome: item.nome, qtd: item.quantidade })),
        total: subtotal,
      };
      
      navigation.navigate('StatusPedido', { pedido: dadosParaStatus });

    } catch (error) {
      setLoading(false);
      console.error("Erro ao finalizar pedido (Supabase):", error);
      
      if (error.message.includes('Network request failed')) {
         Alert.alert(
          "Erro de Rede", 
          "Não foi possível se conectar ao Supabase. Verifique sua internet."
        );
      } else {
         Alert.alert(
          "Erro", 
          `Não foi possível criar o pedido. Mensagem: ${error.message}`
        );
      }
    }
  };
  // --- FIM DA FUNÇÃO CORRIGIDA ---

  // ... (o resto do seu componente return() fica igual)
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Escolha a forma de pagamento</Text>

        <View style={styles.methodSelector}>
          <TouchableOpacity
            style={[styles.methodButton, metodo === 'dinheiro' && styles.methodSelected]}
            onPress={() => setMetodo('dinheiro')}>
            <Ionicons name="cash-outline" size={24} color={metodo === 'dinheiro' ? '#FFF' : '#333'} />
            <Text style={[styles.methodText, metodo === 'dinheiro' && styles.methodTextSelected]}>Dinheiro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodButton, metodo === 'cartao' && styles.methodSelected]}
            onPress={() => setMetodo('cartao')}>
            <Ionicons name="card-outline" size={24} color={metodo === 'cartao' ? '#FFF' : '#333'} />
            <Text style={[styles.methodText, metodo === 'cartao' && styles.methodTextSelected]}>Cartão</Text>
          </TouchableOpacity>
        </View>

        {metodo === 'cartao' && (
          <View style={styles.cardSection}>
            <Text style={styles.sectionTitle}>Meus Cartões</Text>
            <FlatList
              data={cartoes}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.cardItem, cartaoSelecionado?.id === item.id && styles.cardSelected]}
                  onPress={() => setCartaoSelecionado(item)}
                >
                  <Ionicons name="card" size={24} color="#4CAF50" />
                  <Text style={styles.cardText}>Final •••• {item.final}</Text>
                  {cartaoSelecionado?.id === item.id && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CadastroCartao')}>
              <Text style={styles.addButtonText}>Adicionar Novo Cartão</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.confirmButton} onPress={handleFinalizarPedido} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.confirmButtonText}>Finalizar Pedido</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5ff' },
    header: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#7B0909', 
      paddingBottom: 15, 
      paddingHorizontal: 15 
    },
    backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginRight: 20 },
    headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
    content: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    methodSelector: { flexDirection: 'row', marginBottom: 30 },
    methodButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, backgroundColor: '#e0e0e0', borderRadius: 8, marginHorizontal: 5 },
    methodSelected: { backgroundColor: '#7B0909' },
    methodText: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
    methodTextSelected: { color: '#FFF' },
    cardSection: { flex: 1 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    cardItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 2, borderColor: 'transparent' },
    cardSelected: { borderColor: '#4CAF50' },
    cardText: { flex: 1, marginLeft: 15, fontSize: 16 },
    addButton: { backgroundColor: '#e0e0e0', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    addButtonText: { fontSize: 16, fontWeight: 'bold' },
    confirmButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 'auto' },
    confirmButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});