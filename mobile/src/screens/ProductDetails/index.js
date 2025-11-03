import React, { useState, useEffect } from "react"; // 1. Importar useEffect
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
  ActivityIndicator // 2. Importar ActivityIndicator
} from "react-native";
import { useCart } from "../../contexts/CartContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../../services/supabase"; // 3. Importar o Supabase

export default function ProductDetails({ route, navigation }) {
  // 4. Pegar a 'categoria' vinda da tela anterior
  const { product, categoria } = route.params; 
  const { addToCart } = useCart();
  const insets = useSafeAreaInsets();

  // 5. Remover a lista fixa 'ingredientesExtras'
  // const ingredientesExtras = [ ... ]; // REMOVIDO

  // 6. Criar estados para a lista dinâmica e o loading
  const [listaDeExtras, setListaDeExtras] = useState([]);
  const [loadingExtras, setLoadingExtras] = useState(true);

  const [extrasSelecionados, setExtrasSelecionados] = useState([]);
  const [observacoes, setObservacoes] = useState("");

  // 7. UseEffect para buscar os extras no Supabase
  useEffect(() => {
    const fetchExtras = async () => {
      // Se nenhuma categoria foi passada, não faz nada
      if (!categoria) {
        console.warn("Nenhuma categoria de produto foi passada para ProductDetails.");
        setLoadingExtras(false);
        return;
      }

      setLoadingExtras(true);
      
      const { data, error } = await supabase
        .from('Ingredientes') // Nome da sua tabela
        .select('*')
        .eq('categoria', categoria); // Filtra pela categoria correta

      if (error) {
        Alert.alert("Erro", "Não foi possível buscar os ingredientes extras.");
        console.error(error.message);
      } else {
        setListaDeExtras(data);
      }
      setLoadingExtras(false);
    };

    fetchExtras();
  }, [categoria]); // Roda a busca sempre que a 'categoria' mudar

  // O resto da sua lógica (precoTotal, toggleIngrediente, handleAddToCart)
  // já está perfeita e não precisa mudar!
  const precoTotal = (
    product.preco +
    extrasSelecionados.reduce((acc, item) => acc + item.preco, 0)
  ).toFixed(2);

  const toggleIngrediente = (ingrediente) => {
    const jaSelecionado = extrasSelecionados.find((i) => i.id === ingrediente.id);
    if (jaSelecionado) {
      setExtrasSelecionados((prev) => prev.filter((i) => i.id !== ingrediente.id));
    } else {
      setExtrasSelecionados((prev) => [...prev, ingrediente]);
    }
  };

  const handleAddToCart = () => {
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B0909" />

      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.nome}
        </Text>
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
          <Text style={styles.subtitulo}>Adicione ou remova ingredientes</Text>
          
          {/* 8. Mostrar o loading ou a lista */}
          {loadingExtras ? (
            <ActivityIndicator size="large" color="#7B0909" style={{ marginVertical: 20 }} />
          ) : (
            // 9. Mapear a 'listaDeExtras' (do Supabase) em vez de 'ingredientesExtras'
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
                  <Text style={styles.acaoIngrediente}>{selecionado ? "Remover" : "Adicionar"}</Text>
                </TouchableOpacity>
              );
            })
          )}
          {/* Fim da mudança */}

        </View>

        {/* OBSERVAÇÕES */}
        <View style={styles.observacoesContainer}>
          <Text style={styles.subtitulo}>Observações</Text>
          <TextInput
            style={styles.observacoesInput}
            placeholder="Ex: Sem cebola, borda recheada..."
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

// ... (Seus estilos estão perfeitos, não precisa mudar)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B0909",
    paddingBottom: 15,
    paddingHorizontal: 10,
    elevation: 4,
  },
  backButton: { padding: 5, marginRight: 15 },
  backButtonText: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold", flex: 1 },

  content: { padding: 20, paddingBottom: 40 },

  productImage: { width: "100%", height: 280, borderRadius: 20, marginBottom: 20 },

  detailsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productName: { fontSize: 26, fontWeight: "bold", color: "#333" },
  productPrice: { fontSize: 22, fontWeight: "bold", color: "#7B0909", marginVertical: 10 },
  productDescription: { fontSize: 16, color: "#666", lineHeight: 22 },

  extrasContainer: { marginBottom: 25 },
  subtitulo: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 10 },
  ingredienteItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  ingredienteSelecionado: { backgroundColor: "#d9fdd3", borderColor: "#4CAF50" },
  nomeIngrediente: { fontSize: 16, fontWeight: "500", color: "#333" },
  precoIngrediente: { fontSize: 14, color: "#666", marginTop: 4 },
  acaoIngrediente: { marginTop: 6, fontWeight: "bold", color: "#7B0909", textAlign: "right" },

  observacoesContainer: { marginBottom: 25 },
  observacoesInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 80,
  },

  totalContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  totalTexto: { fontSize: 18, fontWeight: "600" },
  totalPreco: { fontSize: 20, fontWeight: "bold", color: "#7B0909" },

  cartButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
  },
  cartButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});