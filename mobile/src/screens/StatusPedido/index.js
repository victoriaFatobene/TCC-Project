import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MUDANÇA: Importar a fonte ---
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";

// ... (Componente StatusCircle está perfeito) ...
const StatusCircle = ({ statusId }) => {
  let color = '#E0E0E0'; 
  if (statusId === 1) {
    color = '#FF0000'; // Vermelho
  } else if (statusId === 2) {
    color = '#FFC107'; // Amarelo
  } else if (statusId === 3) {
    color = '#4CAF50'; // Verde
  }
  return <View style={[styles.statusCircle, { backgroundColor: color }]} />;
};

// ... (Componente StatusItem está perfeito) ...
const StatusItem = ({ icon, label, isCompleted }) => (
  <View style={styles.statusItem}>
    <View style={[styles.statusIconContainer, isCompleted && styles.statusIconCompleted]}>
      <Ionicons name={icon} size={24} color={isCompleted ? '#FFF' : '#7C1D26'} />
    </View>
    <Text style={[styles.statusLabel, isCompleted && styles.statusLabelCompleted]}>{label}</Text>
  </View>
);

export default function StatusPedido({ navigation, route }) {
  const { pedido: pedidoInicial, fromHistory = false } = route.params;

  const [dadosDoPedido, setDadosDoPedido] = useState(pedidoInicial);
  const [itensDetalhados, setItensDetalhados] = useState([]); 
  const insets = useSafeAreaInsets();

  // --- MUDANÇA: Carregar a fonte ---
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  // ... (Função fetchItensDoPedido está perfeita) ...
  const fetchItensDoPedido = useCallback(async (orderId) => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select(`
          id,
          amount,
          extras,
          observacoes,
          item_status_id, 
          product_name 
        `)
        .eq('orderId', orderId);

      if (error) {
        console.error('Erro ao buscar itens do pedido:', error.message);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes dos itens.');
        return [];
      }

      return data.map(item => ({
        id: item.id,
        qtd: item.amount,
        nome: item.product_name || 'Produto Desconhecido', 
        extras: item.extras || [],
        observacoes: item.observacoes || null,
        item_status_id: item.item_status_id || 1, 
      }));

    } catch (err) {
      console.error('Exceção ao buscar itens do pedido:', err.message);
      Alert.alert('Erro', 'Ocorreu um erro ao processar os itens do pedido.');
      return [];
    }
  }, []); 

  useEffect(() => {
    const setupSubscriptions = async () => {
      const fetchedItens = await fetchItensDoPedido(dadosDoPedido.id);
      setItensDetalhados(fetchedItens);
      
      if (fromHistory || dadosDoPedido.status_id === 3) {
        console.log('--- Pedido antigo. Não vou ligar o tempo real. ---');
        return; 
      }

      console.log(`--- TENTANDO OUVIR O PEDIDO: ${dadosDoPedido.id} E SEUS ITENS ---`);

      // ... (O resto do seu useEffect de tempo real está perfeito) ...
      const orderSubscription = supabase
        .channel(`pedido-status-${dadosDoPedido.id}`)
        .on(
          'postgres_changes',
          { 
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `id=eq.${dadosDoPedido.id}`
          },
          (payload) => {
            console.log('--- SINAL DO SUPABASE RECEBIDO (orders)! ATUALIZANDO TELA! ---');
            setDadosDoPedido(estadoAnterior => ({ 
              ...estadoAnterior, 
              ...payload.new,
              itens: estadoAnterior.itens 
            }));
          }
        )
        .subscribe((status) => { /* ... (logs de status) ... */ });

      const itemSubscription = supabase
        .channel(`itens-do-pedido-${dadosDoPedido.id}`)
        .on(
          'postgres_changes',
          { 
            event: 'UPDATE',
            schema: 'public',
            table: 'items',
            filter: `orderId=eq.${dadosDoPedido.id}` 
          },
          async (payload) => {
            console.log('--- SINAL DO SUPABASE RECEBIDO (items)! ATUALIZANDO ITENS! ---');
            
            const updatedItens = await fetchItensDoPedido(dadosDoPedido.id);
            setItensDetalhados(updatedItens);

            const allItemsProntos = updatedItens.length > 0 && updatedItens.every(item => item.item_status_id === 3);

            const { data: currentOrder, error: fetchError } = await supabase
              .from('orders')
              .select('status_id')
              .eq('id', dadosDoPedido.id)
              .single();

            if (fetchError) {
              console.error("Erro ao verificar status atual do pedido:", fetchError.message);
              return;
            }

            if (allItemsProntos && currentOrder.status_id !== 3) {
              console.log("--- TODOS OS ITENS PRONTOS! ATUALIZANDO PEDIDO GERAL... ---");
              
              const { error: updateError } = await supabase
                .from('orders')
                .update({ status_id: 3 }) 
                .eq('id', dadosDoPedido.id);

              if (updateError) {
                console.error("Erro ao auto-atualizar status do pedido:", updateError.message);
              }
            }
          }
        )
        .subscribe((status) => { /* ... (logs de status) ... */ });

      return () => {
        supabase.removeChannel(orderSubscription);
        supabase.removeChannel(itemSubscription);
      };
    };

    setupSubscriptions();
  }, [dadosDoPedido.id, dadosDoPedido.status_id, fetchItensDoPedido, fromHistory]); 

  // --- MUDANÇA: Aguarda a fonte carregar ---
  if (!fontsLoaded) {
    return null;
  }

  // ... (Lógica de status está perfeita) ...
  const statusId = dadosDoPedido.status_id || 1;
  let currentStatusIndex = -1; 
  if (statusId === 1) {
    currentStatusIndex = 0; 
  } else if (statusId === 2) {
    currentStatusIndex = 1; 
  } else if (statusId === 3) {
    currentStatusIndex = 2; 
  }
  const isPedidoPronto = (currentStatusIndex === 2);

  return (
    <View style={styles.container}>
      {/* --- MUDANÇA: Cor do StatusBar --- */}
      <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />
      
      {/* --- MUDANÇA: Cabeçalho com o novo estilo --- */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          onPress={() => navigation.popToTop()} 
          style={[styles.backButton, { top: insets.top + 12 }]} // Alinha com o 'insets'
        >
          {/* Mudei o texto '< Início' para um ícone */}
          <Ionicons name="chevron-back" size={28} color="#FFECD1" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Status do Pedido</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.orderId}>Senha do Pedido</Text>
        <Text style={styles.orderNumber}>
          {dadosDoPedido.senha ? dadosDoPedido.senha.toString().padStart(3, '0') : '...'}
        </Text>
        
        {isPedidoPronto && (
          <View style={styles.readyCard}>
            <Ionicons name="checkmark-circle" size={40} color="#FFF" />
            <Text style={styles.readyText}>Seu pedido está pronto para retirada!</Text>
          </View>
        )}
        
        <View style={styles.statusTracker}>
          <StatusItem icon="hourglass-outline" label="Na Fila" isCompleted={currentStatusIndex >= 0} />
          <View style={[styles.statusLine, currentStatusIndex >= 1 && styles.statusLineCompleted]} />
          <StatusItem icon="pizza-outline" label="Em Preparo" isCompleted={currentStatusIndex >= 1} />
          <View style={[styles.statusLine, currentStatusIndex >= 2 && styles.statusLineCompleted]} />
          <StatusItem icon="checkmark-done-outline" label="Pronto!" isCompleted={currentStatusIndex >= 2} />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo da Compra</Text>
          
          {itensDetalhados.map((item) => ( 
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <Text style={styles.summaryItem}>
                  {item.qtd}x {item.nome}
                </Text>
                <StatusCircle statusId={item.item_status_id} /> 
              </View>
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
            </View>
          ))}
          
          <View style={styles.divider} />
          <Text style={styles.summaryTotal}>Total: R$ {dadosDoPedido.total.toFixed(2)}</Text>
        </View>
        
        {isPedidoPronto && !fromHistory && (
          <TouchableOpacity 
            style={styles.evaluateButton} 
            onPress={() => navigation.navigate('Avaliacao', { orderId: dadosDoPedido.id })}
          >
            <Text style={styles.evaluateButtonText}>Avaliar Pedido</Text>
          </TouchableOpacity>
        )}
        
      </ScrollView>
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
  backButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }, // Mantido por segurança, mas o ícone é usado
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: "DancingScript_700Bold", // Fonte
    color: "#FFECD1", // Cor
    fontSize: 40,
  },
  scrollContent: { padding: 20, paddingBottom: 40 },
  orderId: { fontSize: 22, fontWeight: '600', textAlign: 'center', color: '#555' },
  orderNumber: { 
    fontSize: 80, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#7C1D26', // Cor principal
    marginBottom: 20 
  },
  readyCard: { 
    backgroundColor: '#4CAF50', 
    borderRadius: 12, // Borda
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    elevation: 4, 
    marginBottom: 30 
  },
  readyText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 15, flex: 1 },
  statusTracker: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 },
  statusItem: { alignItems: 'center', flex: 1 },
  statusIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  statusIconCompleted: { backgroundColor: '#7C1D26' }, // Cor principal
  statusLabel: { marginTop: 8, color: '#666', fontWeight: '600', textAlign: 'center' },
  statusLabelCompleted: { color: '#7C1D26' }, // Cor principal
  statusLine: { flex: 1, height: 4, backgroundColor: '#e0e0e0', marginHorizontal: -15, top: 23, zIndex: -1 },
  statusLineCompleted: { backgroundColor: '#7C1D26' }, // Cor principal
  summaryCard: { 
    backgroundColor: '#FFFFFF', // Card
    borderRadius: 24, // Borda
    padding: 20, 
    elevation: 6, // Sombra
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#F3EDE2', // Borda
  },
  summaryTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#7C1D26' }, // Cor principal
  itemContainer: {
    marginBottom: 10,
  },
  itemRow: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusCircle: { 
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  summaryItem: { fontSize: 16, color: '#444' },
  extrasText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 4,
    marginLeft: 10,
  },
  obsText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginTop: 4,
    marginLeft: 10,
  },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  summaryTotal: { 
    fontSize: 20, // Maior
    fontWeight: 'bold', 
    textAlign: 'right',
    color: '#7C1D26', // Cor principal
  },
  evaluateButton: { 
    backgroundColor: '#7C1D26', // Cor principal
    padding: 18, // Mais padding
    borderRadius: 12, // Borda
    alignItems: 'center', 
    marginTop: 10,
    elevation: 3,
  },
  evaluateButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});