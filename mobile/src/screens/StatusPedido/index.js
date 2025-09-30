import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// MODIFICAÇÃO: Removemos os DADOS_EXEMPLO daqui.

const StatusItem = ({ icon, label, isCompleted }) => (
  <View style={styles.statusItem}>
    <View style={[styles.statusIconContainer, isCompleted && styles.statusIconCompleted]}>
      <Ionicons name={icon} size={24} color={isCompleted ? '#FFF' : '#7B0909'} />
    </View>
    <Text style={[styles.statusLabel, isCompleted && styles.statusLabelCompleted]}>{label}</Text>
  </View>
);

// MODIFICAÇÃO: Adicionamos 'route' para receber os dados
export default function StatusPedido({ navigation, route }) {
  // MODIFICAÇÃO: Pegamos os dados do pedido que foram enviados da tela de Pagamento
  const { pedido } = route.params;

  // O estado do nosso pedido agora começa com os dados reais
  const [dadosDoPedido] = useState(pedido);

  const statusList = ['Na Fila', 'Em Preparo', 'Pronto!'];
  const currentStatusIndex = statusList.indexOf(dadosDoPedido.status);
  const isReady = dadosDoPedido.status === 'Pronto!';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* MODIFICAÇÃO: Botão de voltar para a tela inicial, pois o pedido já foi feito */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'} Início</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Status do Pedido</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.orderId}>Senha do Pedido</Text>
        <Text style={styles.orderNumber}>{dadosDoPedido.id}</Text>
        
        {isReady && (
          <View style={styles.readyCard}>
            <Ionicons name="checkmark-circle" size={40} color="#FFF" />
            <Text style={styles.readyText}>Seu pedido está pronto para retirada!</Text>
          </View>
        )}

        <View style={styles.statusTracker}>
          <StatusItem icon="hourglass-outline" label="Na Fila" isCompleted={currentStatusIndex >= 0} />
          <View style={styles.statusLine} />
          <StatusItem icon="pizza-outline" label="Em Preparo" isCompleted={currentStatusIndex >= 1} />
          <View style={styles.statusLine} />
          <StatusItem icon="checkmark-done-outline" label="Pronto!" isCompleted={currentStatusIndex >= 2} />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo da Compra</Text>
          {/* MODIFICAÇÃO: Usamos os itens e o total do pedido real */}
          {dadosDoPedido.itens.map((item, index) => (
            <Text key={index} style={styles.summaryItem}>
              {item.qtd}x {item.nome}
            </Text>
          ))}
          <View style={styles.divider} />
          <Text style={styles.summaryTotal}>Total: R$ {dadosDoPedido.total.toFixed(2)}</Text>
        </View>
        
        {isReady && (
          <TouchableOpacity 
            style={styles.evaluateButton} 
            onPress={() => navigation.navigate('Avaliacao')}
          >
            <Text style={styles.evaluateButtonText}>Avaliar Pedido</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7B0909', paddingVertical: 15, paddingHorizontal: 10 },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  container: { padding: 20, paddingBottom: 40 },
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
  summaryCard: { backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 2, marginBottom: 30 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  summaryItem: { fontSize: 16, color: '#444', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  summaryTotal: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
  evaluateButton: { backgroundColor: '#0288D1', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  evaluateButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});