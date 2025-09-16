import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importar suas telas
import SignIn from "./src/pages/SignIn";
import Dashboard from "./src/pages/Dashboard";
import HomeScreen from "./src/screens/TelaInicial";
import Avaliacao from "./src/screens/Avaliacao";
import Cardapio from "./src/pages/Cardapio";
import Bebidas from "./src/screens/Bebidas";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Avaliacao" component={Avaliacao} />
        <Stack.Screen name="Cardapio" component={Cardapio} />
        <Stack.Screen name="Bebidas" component={Bebidas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
