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

// --- MUDANÇA AQUI ---
const PedidoAntigoItem = ({ item, navigation }) => { 
  const data = new Date(item.created_at).toLocaleDateString('pt-BR');
  
  return (
    <TouchableOpacity 
      style={styles.pedidoCard}
      // Adicionamos 'fromHistory: true' para a tela de Status saber de onde viemos
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
// --- FIM DA MUDANÇA ---

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState([]);

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

  // ... (O resto do seu código 'handleLogout', 'return', etc. está perfeito) ...
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />
      
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minha Conta</Text>
      </View>

      <View style={styles.content}>
        {user ? (
          <>
            <Text style={styles.emailText}>Logado como: {user.email}</Text>
            <Text style={styles.historicoTitle}>Seu Histórico de Pedidos</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#7B0909" style={{ marginTop: 20 }} />
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

// ... (Seus estilos estão perfeitos) ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B0909',
    paddingBottom: 15,
    paddingHorizontal: 10,
    elevation: 4,
  },
  backButton: { padding: 8 },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
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
    color: '#333',
    marginBottom: 15,
  },
  pedidoCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
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
    color: '#7B0909',
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
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
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
  },
  convidadoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  convidadoSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#7B0909',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});