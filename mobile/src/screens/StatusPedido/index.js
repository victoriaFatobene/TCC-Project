import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componente auxiliar (está perfeito, sem mudanças)
const StatusItem = ({ icon, label, isCompleted }) => (
  <View style={styles.statusItem}>
    <View style={[styles.statusIconContainer, isCompleted && styles.statusIconCompleted]}>
      <Ionicons name={icon} size={24} color={isCompleted ? '#FFF' : '#7B0909'} />
    </View>
    <Text style={[styles.statusLabel, isCompleted && styles.statusLabelCompleted]}>{label}</Text>
  </View>
);

export default function StatusPedido({ navigation, route }) {
  const { pedido: pedidoInicial } = route.params;
  const [dadosDoPedido, setDadosDoPedido] = useState(pedidoInicial);
  const insets = useSafeAreaInsets();

  // Esta parte de atualização em tempo real está perfeita!
  useEffect(() => {
    const subscription = supabase
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
          // Quando o status mudar no banco (de false para true),
          // o app atualiza sozinho!
          console.log('Recebi uma atualização no pedido!', payload.new);
          setDadosDoPedido(estadoAnterior => ({ ...estadoAnterior, ...payload.new }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [dadosDoPedido.id]);

  // --- A LÓGICA DE TRADUÇÃO CORRETA COMEÇA AQUI ---

  // 1. Pega os valores booleanos do pedido
  const isDraft = dadosDoPedido.draft;
  const isStatusPronto = dadosDoPedido.status; // false = "Não Pronto", true = "Pronto"

  // 2. Define o "índice" do status para o tracker visual
  let currentStatusIndex = -1; // Padrão: Rascunho (nada completo)
  
  if (isDraft === false && isStatusPronto === false) {
    // Pedido finalizado, mas não pronto.
    // Começa no índice 0 ("Na Fila")
    
    // *** ESTA É A CORREÇÃO ***
    currentStatusIndex = 0; 
    // *** FIM DA CORREÇÃO ***

  } else if (isDraft === false && isStatusPronto === true) {
    // Pedido finalizado E pronto
    currentStatusIndex = 2; // Todos os 3 (>=0, >=1, >=2) acenderão.
  }

  // 3. Variável de conveniência para mostrar/esconder botões
  const isPedidoPronto = (currentStatusIndex === 2);

  // --- FIM DA CORREÇÃO ---

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Menu', { screen: 'HomeScreen' })} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{'<'} Início</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Status do Pedido</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.orderId}>Senha do Pedido</Text>
        <Text style={styles.orderNumber}>{dadosDoPedido.id.substring(0, 8)}</Text>
        
        {/* Usando a nova variável 'isPedidoPronto' */}
        {isPedidoPronto && (
          <View style={styles.readyCard}>
            <Ionicons name="checkmark-circle" size={40} color="#FFF" />
            <Text style={styles.readyText}>Seu pedido está pronto para retirada!</Text>
          </View>
        )}
        
        <View style={styles.statusTracker}>
          {/* A lógica do 'isCompleted' agora funciona perfeitamente */}
          <StatusItem icon="hourglass-outline" label="Na Fila" isCompleted={currentStatusIndex >= 0} />
          <View style={[styles.statusLine, currentStatusIndex >= 1 && styles.statusLineCompleted]} />
          <StatusItem icon="pizza-outline" label="Em Preparo" isCompleted={currentStatusIndex >= 1} />
          <View style={[styles.statusLine, currentStatusIndex >= 2 && styles.statusLineCompleted]} />
          <StatusItem icon="checkmark-done-outline" label="Pronto!" isCompleted={currentStatusIndex >= 2} />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo da Compra</Text>
          {/* AQUI MOSTRA OS ITENS */}
          {dadosDoPedido.itens.map((item, index) => (
            <Text key={index} style={styles.summaryItem}>
              {item.qtd}x {item.nome}
            </Text>
          ))}
          <View style={styles.divider} />
          {/* AQUI MOSTRA O TOTAL */}
          <Text style={styles.summaryTotal}>Total: R$ {dadosDoPedido.total.toFixed(2)}</Text>
        </View>
        
        {/* Usando a nova variável 'isPedidoPronto' */}
        {isPedidoPronto && (
          <TouchableOpacity 
            style={styles.evaluateButton} 
            onPress={() => navigation.navigate('Avaliacao')}
          >
            <Text style={styles.evaluateButtonText}>Avaliar Pedido</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

// Adicionei a cor da linha completada nos estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#7B0909', 
    paddingBottom: 15, 
    paddingHorizontal: 10 
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  orderId: { fontSize: 22, fontWeight: '600', textAlign: 'center', color: '#555' },
  orderNumber: { fontSize: 80, fontWeight: 'bold', textAlign: 'center', color: '#7B0909', marginBottom: 20 },
  readyCard: { backgroundColor: '#4CAF50', borderRadius: 12, padding: 20, flexDirection: 'row', alignItems: 'center', elevation: 4, marginBottom: 30 },
  readyText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 15, flex: 1 },
  statusTracker: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 },
  statusItem: { alignItems: 'center', flex: 1 },
  statusIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  statusIconCompleted: { backgroundColor: '#7B0909' },
  statusLabel: { marginTop: 8, color: '#666', fontWeight: '600', textAlign: 'center' },
  statusLabelCompleted: { color: '#7B0909' },
  statusLine: { flex: 1, height: 4, backgroundColor: '#e0e0e0', marginHorizontal: -15, top: 23, zIndex: -1 },
  statusLineCompleted: { backgroundColor: '#7B0909' }, // <-- Estilo que faltava
  summaryCard: { backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 2, marginBottom: 30 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  summaryItem: { fontSize: 16, color: '#444', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  summaryTotal: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
  evaluateButton: { backgroundColor: '#0288D1', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  evaluateButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});