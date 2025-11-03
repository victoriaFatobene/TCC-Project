import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";

// 1. A tela agora espera receber a função 'onEntrarConvidado'
export default function Login({ navigation, onEntrarConvidado }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Preencha e-mail e senha.');
    }
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <Text style={styles.headerTitle}>🍕 BravaZatta</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
        
        {/* --- 2. BOTÃO NOVO (EM PORTUGUÊS) --- */}
        <TouchableOpacity 
          style={styles.botaoConvidado}   // Estilo em português
          onPress={onEntrarConvidado}    // Chama a função
        >
          <Text style={styles.textoConvidado}>Entrar como convidado</Text>
        </TouchableOpacity>
        {/* --- FIM DO BOTÃO NOVO --- */}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { 
    backgroundColor: '#7B0909', 
    paddingBottom: 15, 
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#7B0909',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  linkButton: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#7B0909', fontSize: 16, fontWeight: 'bold' },
  
  // --- 3. ESTILOS NOVOS (EM PORTUGUÊS) ---
  botaoConvidado: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  textoConvidado: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // --- FIM DOS ESTILOS NOVOS ---
});