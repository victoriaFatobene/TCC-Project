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
import PizzasVeganas from './src/screens/Veganas'; // <-- CORREÇÃO AQUI
import Bebidas from './src/screens/Bebidas';
import Sobremesas from './src/screens/Sobremesas';
import Avaliacao from './src/screens/Avaliacao';
import Carrinho from './src/screens/Carrinho';
import Pagamento from './src/screens/Pagamento';
import VerMais from './src/screens/VerMais';
import ProductDetails from './src/screens/ProductDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Pacote de Telas do Cardápio ---
function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Pizzas" component={Pizzas} />
      <Stack.Screen name="Cardapio" component={Cardapio} />
      <Stack.Screen name="PizzasVeganas" component={PizzasVeganas} />
      <Stack.Screen name="Bebidas" component={Bebidas} />
      <Stack.Screen name="Sobremesas" component={Sobremesas} />
      <Stack.Screen name="Avaliacao" component={Avaliacao} />
      <Stack.Screen name="Pagamento" component={Pagamento} />
      <Stack.Screen name="VerMais" component={VerMais} />
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