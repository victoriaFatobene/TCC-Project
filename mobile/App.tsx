import React, { useState } from 'react'; // <-- Importe o 'useState'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from './src/contexts/CartContext';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';

// --- Imports das suas telas (Tudo certo) ---
import HomeScreen from './src/screens/TelaInicial';
import Pizzas from './src/screens/Pizzas';
import MenuPizzas from './src/screens/MenuPizzas';
import Veganas from './src/screens/Veganas';
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
import VerMais from './src/screens/VerMais';

// --- Tipagem (Tudo certo) ---
type RootStackParamList = {
  MainTabs: undefined;
  Pagamento: { novoCartao?: object };
  StatusPedido: { pedido: object };
  CadastroCartao: undefined;
  Avaliacao: undefined;
};
type MenuStackParamList = {
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
  ProductDetails: { product: object };
  VerMais: undefined;
};
type TabParamList = {
  Menu: undefined;
  Carrinho: undefined;
};
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// --- Navegadores ---
const RootStack = createStackNavigator<RootStackParamList>();
const MenuStackNav = createStackNavigator<MenuStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

// --- MODIFICAÇÃO (EM PORTUGUÊS) ---
// A 'AuthScreens' agora recebe a função 'onEntrarConvidado'
function AuthScreens({ onEntrarConvidado }: { onEntrarConvidado: () => void }) {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login">
        {/* E passa essa função para o LoginScreen */}
        {(props) => <LoginScreen {...props} onEntrarConvidado={onEntrarConvidado} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// --- MenuScreens (Sem mudança) ---
function MenuScreens() {
  return (
    <MenuStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MenuStackNav.Screen name="HomeScreen" component={HomeScreen} />
      <MenuStackNav.Screen name="Pizzas" component={Pizzas} />
      <MenuStackNav.Screen name="MenuPizzas" component={MenuPizzas} />
      <MenuStackNav.Screen name="PizzasVeganas" component={Veganas} />
      <MenuStackNav.Screen name="PizzasDoces" component={PizzasDoces} />
      <MenuStackNav.Screen name="Bebidas" component={Bebidas} />
      <MenuStackNav.Screen name="Refrigerantes" component={Refrigerantes} />
      <MenuStackNav.Screen name="Sucos" component={Sucos} />
      <MenuStackNav.Screen name="Alcoolicas" component={Alcoolicas} />
      <MenuStackNav.Screen name="Vinhos" component={Vinhos} />
      <MenuStackNav.Screen name="Sobremesas" component={Sobremesas} />
      <MenuStackNav.Screen name="Sorvetes" component={Sorvetes} />
      <MenuStackNav.Screen name="Bolos" component={Bolos} />
      <MenuStackNav.Screen name="Doces" component={Doces} />
      <MenuStackNav.Screen name="ProductDetails" component={ProductDetails} />
      <MenuStackNav.Screen name="VerMais" component={VerMais} />
    </MenuStackNav.Navigator>
  );
}

// --- TabNavigator (Sem mudança) ---
function TabNavigator() {
  return (
    <Tab.Navigator
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
        component={MenuScreens}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          tabBarLabel: 'Carrinho',
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}


// --- MODIFICAÇÃO (EM PORTUGUÊS) ---
// O "Porteiro" agora entende 'eConvidado'
function RootNavigator() {
  const { session } = useAuth();
  const [eConvidado, setEConvidado] = useState(false); // 1. Criamos o estado "é Convidado"

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {/* 2. Verificamos: O usuário está logado OU 'é Convidado'? */}
      {(session && session.user) || eConvidado ? (
        
        // Sim? Mostre o app principal
        <>
          <RootStack.Screen name="MainTabs" component={TabNavigator} />
          <RootStack.Screen name="Pagamento" component={Pagamento} />
          <RootStack.Screen name="StatusPedido" component={StatusPedido} />
          <RootStack.Screen name="CadastroCartao" component={CadastroCartao} />
          <RootStack.Screen name="Avaliacao" component={Avaliacao} />
        </>
      ) : (
        
        // Não? Mostre as telas de Auth e passe a função 'setEConvidado'
        <RootStack.Screen name="MainTabs">
          {(props) => <AuthScreens {...props} onEntrarConvidado={() => setEConvidado(true)} />}
        </RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
}

// --- App() (Sem mudança) ---
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider> 
        <CartProvider>
          <NavigationContainer>
            <RootNavigator /> 
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}