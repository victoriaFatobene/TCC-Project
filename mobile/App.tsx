import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// --- Importe o "Gerente" do Carrinho ---
import { CartProvider } from './src/contexts/CartContext';

// --- Importe TODAS as suas telas aqui ---
import HomeScreen from './src/screens/TelaInicial';
import Pizzas from './src/screens/Pizzas';
import Cardapio from './src/screens/Cardapio';
import PizzasVeganas from './src/screens/Veganas';
import PizzasDoces from './src/screens/PizzasDoces';
import Bebidas from './src/screens/Bebidas';
import Refrigerantes from './src/screens/Refrigerantes';
import Sucos from './src/screens/Sucos';
import Alcoolicas from './src/screens/Alcoolicas';
import Vinhos from './src/screens/Vinhos';
import Sobremesas from './src/screens/Sobremesas';
import Sorvetes from './src/screens/Sorvetes';
import Bolos from './src/screens/Bolos';
import Doces from './src/screens/Doces';
import Avaliacao from './src/screens/Avaliacao';
import Carrinho from './src/screens/Carrinho';
import Pagamento from './src/screens/Pagamento';
import ProductDetails from './src/screens/ProductDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Pacote de Telas do Cardápio ---
// Este é o "mapa" completo do seu fluxo de navegação.
// TODAS as telas que podem ser acessadas devem estar listadas aqui.
function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Pizzas" component={Pizzas} />
      <Stack.Screen name="Cardapio" component={Cardapio} />
      <Stack.Screen name="PizzasVeganas" component={PizzasVeganas} />
      <Stack.Screen name="PizzasDoces" component={PizzasDoces} />
      <Stack.Screen name="Bebidas" component={Bebidas} />
      <Stack.Screen name="Refrigerantes" component={Refrigerantes} />
      <Stack.Screen name="Sucos" component={Sucos} />
      <Stack.Screen name="Alcoolicas" component={Alcoolicas} />
      <Stack.Screen name="Vinhos" component={Vinhos} />
      <Stack.Screen name="Sobremesas" component={Sobremesas} />
      <Stack.Screen name="Sorvetes" component={Sorvetes} />
      <Stack.Screen name="Bolos" component={Bolos} />
      <Stack.Screen name="Doces" component={Doces} />
      <Stack.Screen name="Avaliacao" component={Avaliacao} />
      <Stack.Screen name="Pagamento" component={Pagamento} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

// --- Componente Principal do App ---
export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#EEFF00',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
              backgroundColor: '#5B0000',
              borderTopWidth: 0,
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
          }}
        >
          {/* Aba 1: Menu (que contém a pilha de telas) */}
          <Tab.Screen
            name="Menu"
            component={MenuStack}
            options={{
              tabBarLabel: 'Início',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />

          {/* Aba 2: Carrinho */}
          <Tab.Screen
            name="CarrinhoTab"
            component={Carrinho}
            options={{
              tabBarLabel: 'Carrinho',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

