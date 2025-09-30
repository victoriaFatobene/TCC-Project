import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from './src/contexts/CartContext';

// Importando todas as telas necessárias
import HomeScreen from './src/screens/TelaInicial';
import Pizzas from './src/screens/Pizzas';
import MenuPizzas from './src/screens/MenuPizzas';
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
import StatusPedido from './src/screens/StatusPedido';
import CadastroCartao from './src/screens/CadastroCartao';

// --- Tipagem para os Navegadores (As "Etiquetas") ---
type RootStackParamList = {
  HomeScreen: undefined;
  Pizzas: undefined;
  MenuPizzas: undefined;
  PizzasVeganas: undefined;
  PizzasDoces: undefined;
  Bebidas: undefined;
  Refrigerantes: undefined;
  Sucos: undefined;
  Alcoolicas: undefined;
  Vinhos: undefined;
  Sobremesas: undefined;
  Sorvetes: undefined;
  Bolos: undefined;
  Doces: undefined;
  Avaliacao: undefined;
  Pagamento: { novoCartao?: object };
  ProductDetails: { product: object };
  StatusPedido: { orderId: number };
  CadastroCartao: undefined;
};

type RootTabParamList = {
  Menu: undefined;
  CarrinhoTab: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Pizzas" component={Pizzas} />
      <Stack.Screen name="MenuPizzas" component={MenuPizzas} />
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
      <Stack.Screen name="StatusPedido" component={StatusPedido} />
      <Stack.Screen name="CadastroCartao" component={CadastroCartao} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <Tab.Navigator
          
            initialRouteName="Menu"
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#EEFF00',
              tabBarInactiveTintColor: 'white',
              tabBarStyle: { backgroundColor: '#5B0000', borderTopWidth: 0 },
              tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            }}
          >
            <Tab.Screen
              name="Menu"
              component={MenuStack}
              options={{
                tabBarLabel: 'Início',
                tabBarIcon: ({ color, size }: { color: string, size: number }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="CarrinhoTab"
              component={Carrinho}
              options={{
                tabBarLabel: 'Carrinho',
                tabBarIcon: ({ color, size }: { color: string, size: number }) => (
                  <Ionicons name="cart" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}