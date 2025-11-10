import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../services/supabase';

// --- MUDANÇA: Importar a fonte ---
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";

const PedidoAntigoItem = ({ item, navigation }) => { 
  const data = new Date(item.created_at).toLocaleDateString('pt-BR');
  
  return (
    <TouchableOpacity 
      style={styles.pedidoCard}
      onPress={() => navigation.navigate('StatusPedido', { pedido: item, fromHistory: true })}
    >
      <View style={styles.pedidoInfo}>
        <View style={styles.pedidoHeader}>
          <Text style={styles.pedidoSenha}>Senha: {item.senha ? item.senha.toString().padStart(3, '0') : 'N/A'}</Text>
          <Text style={styles.pedidoData}>{data}</Text>
        </View>
        <Text style={styles.pedidoTotal}>Total: R$ {item.total ? item.total.toFixed(2) : '0.00'}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState([]);

  // --- MUDANÇA: Carregar a fonte ---
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchHistorico = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('orders')
        .select('id, created_at, total, senha, status_id') 
        .eq('user_id', user.id) 
        .order('created_at', { ascending: false }); 

      if (error) {
        Alert.alert("Erro", "Não foi possível buscar seu histórico de pedidos.");
        console.error("Erro fetchHistorico:", error.message);
      } else {
        setPedidos(data);
      }
      setLoading(false);
    };

    fetchHistorico();
  }, [user]); 

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          onPress: () => signOut(), 
          style: "destructive" 
        }
      ]
    );
  };

  // --- MUDANÇA: Aguarda a fonte carregar ---
  if (!fontsLoaded) {
    return null;
  }

  return (
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
          <Text style={styles.headerTitle}>Minha Conta</Text>
        </View>
      </View>

      <View style={styles.content}>
        {user ? (
          <>
            <Text style={styles.emailText}>Logado como: {user.email}</Text>
            <Text style={styles.historicoTitle}>Seu Histórico de Pedidos</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#7C1D26" style={{ marginTop: 20 }} />
            ) : (
              <FlatList
                data={pedidos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PedidoAntigoItem item={item} navigation={navigation} />}
                ListEmptyComponent={<Text style={styles.emptyText}>Você ainda não fez nenhum pedido.</Text>}
                contentContainerStyle={{ paddingBottom: 120 }}
              />
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.convidadoContainer}>
            <Text style={styles.convidadoTitle}>Você está como convidado</Text>
            <Text style={styles.convidadoSubtext}>
              Faça login ou crie uma conta para salvar seu histórico de pedidos e facilitar suas compras.
            </Text>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={() => signOut()}
            >
              <Text style={styles.loginButtonText}>Ir para Login / Cadastro</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: "DancingScript_700Bold", // Fonte
    color: "#FFECD1", // Cor
    fontSize: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  historicoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7C1D26', // Cor principal
    marginBottom: 15,
  },
  pedidoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, // Borda arredondada
    padding: 15,
    marginBottom: 10,
    elevation: 3, // Sombra
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderColor: '#F3EDE2', // Borda
    borderWidth: 1,
  },
  pedidoInfo: {
    flex: 1, 
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  pedidoSenha: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7C1D26', // Cor principal
  },
  pedidoData: {
    fontSize: 14,
    color: '#888',
  },
  pedidoTotal: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    padding: 18,
    borderRadius: 12, // Borda arredondada
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 3, // Sombra
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  convidadoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10, // Evita que o texto encoste nas bordas
  },
  convidadoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#7C1D26', // Cor principal
  },
  convidadoSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#7C1D26', // Cor principal
    padding: 18,
    borderRadius: 12, // Borda arredondada
    alignItems: 'center',
    elevation: 3, // Sombra
    paddingHorizontal: 30, // Mais padding
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});