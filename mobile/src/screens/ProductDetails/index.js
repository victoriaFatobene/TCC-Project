import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
  ActivityIndicator
} from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../services/supabase"; 

// --- MUDANÇA: Importar a fonte e ícones ---
import {
  useFonts,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { Ionicons } from "@expo/vector-icons"; // Ícone de voltar

export default function ProductDetails({ route, navigation }) {
  const { product, categoria } = route.params; 
  const { addToCart } = useCart();
  const insets = useSafeAreaInsets();

  const [listaDeExtras, setListaDeExtras] = useState([]);
  const [loadingExtras, setLoadingExtras] = useState(true);
  const [extrasSelecionados, setExtrasSelecionados] = useState([]);
  const [observacoes, setObservacoes] = useState("");

  // --- MUDANÇA: Carregar a fonte ---
  const [fontsLoaded] = useFonts({
    DancingScript_700Bold,
  });

  useEffect(() => {
    const fetchExtras = async () => {
      if (!categoria) {
        setLoadingExtras(false);
        return;
      }
      setLoadingExtras(true);
      
      const { data, error } = await supabase
        .from('ingredients') 
        .select('*')
        .eq('categoria', categoria); 

      if (error) {
        Alert.alert("Erro", "Não foi possível buscar os ingredientes extras.");
        console.error("Erro do Supabase:", error.message); 
      } else {
        setListaDeExtras(data);
      }
      setLoadingExtras(false);
    };
    fetchExtras();
  }, [categoria]); 

  // Cálculo do precoTotal (já corrigido para item.price)
  const precoTotal = (
    product.preco +
    extrasSelecionados.reduce((acc, item) => acc + item.price, 0)
  ).toFixed(2);
  
  const toggleIngrediente = (ingrediente) => {
    // ... (lógica de toggle está correta)
    const jaSelecionado = extrasSelecionados.find((i) => i.id === ingrediente.id);
    if (jaSelecionado) {
      setExtrasSelecionados((prev) => prev.filter((i) => i.id !== ingrediente.id));
    } else {
      setExtrasSelecionados((prev) => [...prev, ingrediente]);
    }
  };

  const handleAddToCart = () => {
    // ... (lógica de adicionar ao carrinho está correta)
    addToCart({
      ...product,
      extras: extrasSelecionados,
      observacoes,
      quantidade: 1,
      precoFinal: parseFloat(precoTotal),
    });
    Alert.alert(
      "🍕 Sucesso!",
      `${product.nome} foi adicionado ao carrinho.\nTotal: R$ ${precoTotal}`
    );
    navigation.goBack();
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
          <Text style={styles.headerTitle} numberOfLines={1}>
            {product.nome}
          </Text>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={product.imagem} style={styles.productImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.nome}</Text>
          <Text style={styles.productPrice}>R$ {product.preco.toFixed(2)}</Text>
          <Text style={styles.productDescription}>
            {product.ingredientes || "Descrição detalhada do produto."}
          </Text>
        </View>
        <View style={styles.extrasContainer}>
          <Text style={styles.subtitulo}>Adicionar / Remover</Text>
          {loadingExtras ? (
            <ActivityIndicator size="large" color="#7C1D26" style={{ marginVertical: 20 }} />
          ) : (
            listaDeExtras.map((item) => {
              const selecionado = extrasSelecionados.find((i) => i.id === item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.ingredienteItem, selecionado && styles.ingredienteSelecionado]}
                  onPress={() => toggleIngrediente(item)}
                >
                  <Text style={styles.nomeIngrediente}>{item.name}</Text>
                  <Text style={styles.precoIngrediente}>+ R$ {item.price.toFixed(2)}</Text>
                  {/* --- MUDANÇA: Ícone de Check --- */}
                  {selecionado && <Ionicons name="checkmark-circle" size={22} color="#7C1D26" style={styles.acaoIcone} />}
                </TouchableOpacity>
              );
            })
          )}
        </View>
        <View style={styles.observacoesContainer}>
          <Text style={styles.subtitulo}>Observações</Text>
          <TextInput
            style={styles.observacoesInput}
            placeholder="Ex: Sem cebola, borda recheada..."
            placeholderTextColor="#999"
            multiline
            value={observacoes}
            onChangeText={setObservacoes}
          />
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalTexto}>Total:</Text>
          <Text style={styles.totalPreco}>R$ {precoTotal}</Text>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 60, // Espaço para o botão de voltar
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
    fontSize: 36, // Um pouco menor para caber
    textAlign: 'center',
  },
  content: { padding: 20, paddingBottom: 40 },
  productImage: { 
    width: "100%", 
    height: 280, 
    borderRadius: 24, // Borda
    marginBottom: 20 
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24, // Borda
    padding: 20,
    marginBottom: 20,
    elevation: 6, // Sombra
    borderWidth: 1,
    borderColor: '#F3EDE2', // Borda
  },
  productName: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#7C1D26" // Cor principal
  },
  productPrice: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#7C1D26", // Cor principal
    marginVertical: 10 
  },
  productDescription: { fontSize: 16, color: "#666", lineHeight: 22 },
  extrasContainer: { marginBottom: 25 },
  subtitulo: { 
    fontSize: 20, // Maior
    fontWeight: "bold", 
    color: "#7C1D26", // Cor principal
    marginBottom: 15 
  },
  ingredienteItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12, // Borda
    borderWidth: 1,
    borderColor: "#F3EDE2", // Borda
    marginBottom: 10,
    flexDirection: 'row', // Para alinhar o ícone
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  ingredienteSelecionado: { 
    backgroundColor: "#FFF8F0", // Fundo leve
    borderColor: "#7C1D26", // Borda principal
    borderWidth: 1.5,
  },
  nomeIngrediente: { fontSize: 16, fontWeight: "500", color: "#333", flex: 1 },
  precoIngrediente: { fontSize: 14, color: "#555", marginLeft: 10 },
  acaoIcone: { // Ícone de check
    marginLeft: 10,
  },
  observacoesContainer: { marginBottom: 25 },
  observacoesInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F3EDE2",
    borderRadius: 12, // Borda
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 80,
    elevation: 2,
  },
  totalContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 15,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  totalTexto: { fontSize: 20, fontWeight: "600", color: '#333' },
  totalPreco: { 
    fontSize: 24, // Maior
    fontWeight: "bold", 
    color: "#7C1D26" // Cor principal
  },
  cartButton: {
    backgroundColor: "#7C1D26", // Cor principal
    paddingVertical: 18, // Mais padding
    borderRadius: 12, // Borda
    alignItems: "center",
    elevation: 4,
  },
  cartButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});