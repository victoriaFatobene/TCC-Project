import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// --- Importe o "Gerente" do Carrinho ---
import { CartProvider } from './src/contexts/CartContext';

// --- Importe TODAS as suas telas aqui ---
import HomeScreen from './src/screens/TelaInicial';
import Avaliacao from './src/screens/Avaliacao';
import Cardapio from './src/pages/Cardapio';
import Bebidas from './src/screens/Bebidas';
// CORREÇÃO: O caminho para o Carrinho provavelmente é em /pages e não /screens
import Carrinho from './src/screens/Carrinho'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Pacote de Telas do Cardápio ---
function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Cardapio" component={Cardapio} />
      <Stack.Screen name="Bebidas" component={Bebidas} />
      <Stack.Screen name="Avaliacao" component={Avaliacao} />
    </Stack.Navigator>
  );
}

// --- Componente Principal do App ---
export default function App() {
  return (
    // O CartProvider "abraça" o app, disponibilizando o carrinho para todas as telas
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
          {/* Aba 1: Menu (contém a pilha de telas) */}
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