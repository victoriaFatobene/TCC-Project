// Dentro do seu arquivo src/screens/Pagamento/index.js (exemplo)

import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Pagamento({ navigation }) {
  
  const handleFinalizarPedido = () => {
    // 1. AQUI VOCÊ COLOCARIA A LÓGICA PARA ENVIAR O PEDIDO PARA O SISTEMA
    console.log("Pedido enviado para a cozinha!");

    // 2. EM SEGUIDA, NAVEGUE PARA A TELA DE STATUS
    //    Geramos um número de pedido aleatório para o exemplo.
    const numeroDoPedido = Math.floor(Math.random() * 1000);

    // O comando mágico é este:
    navigation.navigate('StatusPedido', {
      orderId: numeroDoPedido, // Você pode passar dados para a próxima tela
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho da sua página de pagamento */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Finalize seu Pedido</Text>
        {/* Aqui entrariam as opções de pagamento, etc. */}

        {/* O BOTÃO QUE LEVA PARA A TELA DE STATUS */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleFinalizarPedido}>
          <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos de exemplo
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#7B0909', paddingVertical: 15, paddingHorizontal: 10 },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  confirmButton: { backgroundColor: '#4CAF50', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10, elevation: 3 },
  confirmButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});