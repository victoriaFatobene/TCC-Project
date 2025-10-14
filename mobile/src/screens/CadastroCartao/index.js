import React, { useState } from 'react';
import { 
  // MODIFICAÇÃO 1: Trocamos SafeAreaView por View e adicionamos os outros
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  StatusBar 
} from 'react-native';
// MODIFICAÇÃO 2: Importamos o hook
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CadastroCartao({ navigation }) {
  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  // MODIFICAÇÃO 3: Usamos o hook
  const insets = useSafeAreaInsets();

  const handleSalvar = () => {
    if (!numero || !nome || !validade || !cvv) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const novoCartao = {
      id: Date.now().toString(),
      final: numero.slice(-4),
      nome: nome,
    };

    navigation.navigate('Pagamento', { novoCartao: novoCartao });
  };

  return (
    // MODIFICAÇÃO 4: Usamos uma View normal como container
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* MODIFICAÇÃO 5: Aplicamos o padding dinâmico */}
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Cartão</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Número do Cartão</Text>
        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000 0000"
          keyboardType="number-pad"
          value={numero}
          onChangeText={setNumero}
          maxLength={16}
        />

        <Text style={styles.label}>Nome no Cartão</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu Nome Completo"
          value={nome}
          onChangeText={setNome}
        />

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Validade (MM/AA)</Text>
            <TextInput
              style={styles.input}
              placeholder="12/28"
              keyboardType="number-pad"
              value={validade}
              onChangeText={setValidade}
              maxLength={5}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              keyboardType="number-pad"
              value={cvv}
              onChangeText={setCvv}
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          <Text style={styles.saveButtonText}>Salvar Cartão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    // MODIFICAÇÃO 6: Ajustamos o estilo do header
    header: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#7B0909', 
      paddingBottom: 15, 
      paddingHorizontal: 15 
    },
    backButtonText: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginRight: 20 },
    headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
    form: { padding: 20 },
    label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
    input: { backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 12, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#ddd', marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    col: { flex: 1, marginRight: 10 },
    saveButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
    saveButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});