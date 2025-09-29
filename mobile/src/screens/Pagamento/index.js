import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function Pagamento({ navigation, route }) {
  const { clearCart } = useCart();
  const [metodo, setMetodo] = useState('dinheiro'); // 'dinheiro' ou 'cartao'
  const [cartoes, setCartoes] = useState([
    // Cartão de exemplo para começar
    { id: '1', final: '1234', nome: 'Meu Cartão Fictício' },
  ]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);

  // Efeito para receber um novo cartão da tela de cadastro
  useEffect(() => {
    if (route.params?.novoCartao) {
      setCartoes(listaAnterior => [...listaAnterior, route.params.novoCartao]);
    }
  }, [route.params?.novoCartao]);

  const handleFinalizarPedido = () => {
    if (metodo === 'cartao' && !cartaoSelecionado) {
      alert('Por favor, selecione um cartão.');
      return;
    }
    
    console.log(`Pedido finalizado com ${metodo}.`);
    clearCart();
    const numeroDoPedido = Math.floor(Math.random() * 1000);
    navigation.navigate('StatusPedido', { orderId: numeroDoPedido });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Escolha a forma de pagamento</Text>

        {/* Seletores de Método */}
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

        {/* Seção do Cartão (só aparece se 'cartao' for selecionado) */}
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

        <TouchableOpacity style={styles.confirmButton} onPress={handleFinalizarPedido}>
          <Text style={styles.confirmButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7B0909', paddingVertical: 15, paddingHorizontal: 15 },
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