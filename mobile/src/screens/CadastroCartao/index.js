import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  StatusBar,
  ScrollView, // --- MUDANÇA: Para rolar
  KeyboardAvoidingView, // --- MUDANÇA: Para o teclado
  Platform // --- MUDANÇA: Para o teclado
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- MUDANÇA: Importar a fonte e ícones ---
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { Ionicons } from "@expo/vector-icons";

export default function CadastroCartao({ navigation }) {
  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const insets = useSafeAreaInsets();

  // --- MUDANÇA: Carregar a fonte ---
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

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
          {/* --- MUDANÇA: Cor do StatusBar --- */}
          <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />

          {/* --- MUDANÇA: Cabeçalho com o novo estilo --- */}
          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={[styles.backButton, { top: insets.top + 12 }]} // Alinha com o 'insets'
            >
              <Ionicons name="chevron-back" size={28} color="#FFECD1" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Adicionar Cartão</Text>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Número do Cartão</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={22} color="#7C1D26" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={numero}
                onChangeText={setNumero}
                maxLength={16}
              />
            </View>

            <Text style={styles.label}>Nome no Cartão</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={22} color="#7C1D26" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Seu Nome Completo"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Validade (MM/AA)</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="calendar-outline" size={22} color="#7C1D26" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="12/28"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    value={validade}
                    onChangeText={setValidade}
                    maxLength={5}
                  />
                </View>
              </View>
              <View style={[styles.col, { marginLeft: 15 }]}>
                <Text style={styles.label}>CVV</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={22} color="#7C1D26" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    value={cvv}
                    onChangeText={setCvv}
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
              <Text style={styles.saveButtonText}>Salvar Cartão</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    form: { 
      padding: 22, // Padding
      flex: 1, 
      justifyContent: 'center',
    },
    label: { 
      fontSize: 16, 
      fontWeight: '600', 
      color: '#7C1D26', // Cor principal
      marginBottom: 8,
      marginLeft: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 12, // Borda
      marginBottom: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      borderWidth: 1,
      borderColor: '#F3EDE2', // Borda
    },
    inputIcon: {
      paddingLeft: 15,
    },
    input: {
      flex: 1,
      paddingVertical: 15,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#333',
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    col: { flex: 1 },
    saveButton: { 
      backgroundColor: '#4CAF50', // Verde
      padding: 18, // Mais padding
      borderRadius: 12, // Borda
      alignItems: 'center', 
      marginTop: 20,
      elevation: 3,
    },
    saveButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});