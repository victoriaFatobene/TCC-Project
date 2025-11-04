import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert,
  Image, // --- MUDANÇA: Importar Image
  ScrollView, // --- MUDANÇA: Para evitar que o teclado cubra os inputs
  KeyboardAvoidingView, // --- MUDANÇA: Para o teclado
  Platform, // --- MUDANÇA: Para o teclado
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
// --- MUDANÇA: Importar a fonte e ícones ---
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { Ionicons } from "@expo/vector-icons";

export default function Login({ navigation, onEntrarConvidado }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  // --- MUDANÇA: Carregar a fonte ---
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Preencha e-mail e senha.');
    }
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  if (!fontsLoaded) {
    return null; // Aguarda a fonte carregar
  }

  return (
    // --- MUDANÇA: Adicionado KeyboardAvoidingView e ScrollView ---
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#7C1D26" />
          
          {/* --- MUDANÇA: Cabeçalho com o novo estilo --- */}
          <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <Image
              source={require("../../assets/images/pizzalogo.png")}
              style={styles.headerImage}
            />
            <Text style={styles.headerTitle}>Bravazatta</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={22} color="#7C1D26" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={22} color="#7C1D26" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
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
            
            <TouchableOpacity 
              style={styles.botaoConvidado} 
              onPress={onEntrarConvidado}
            >
              <Text style={styles.textoConvidado}>Entrar como convidado</Text>
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
    backgroundColor: "#FFFDF6", // Cor de fundo da TelaInicial
  },
  header: {
    backgroundColor: '#7C1D26', // Cor do cabeçalho da TelaInicial
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    elevation: 5,
  },
  headerImage: {
    width: 150,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: "DancingScript_700Bold",
    color: "#FFECD1",
    fontSize: 46,
    marginTop: -50, // Aproxima o texto da logo
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centraliza o formulário
    paddingHorizontal: 22, // Padding da TelaInicial
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7C1D26', // Cor principal
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#F3EDE2',
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
  button: {
    backgroundColor: '#7C1D26', // Cor principal
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  linkButton: { marginTop: 20, alignItems: 'center' },
  linkText: {
    color: '#7C1D26', // Cor principal
    fontSize: 16,
    fontWeight: 'bold',
  },
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
});