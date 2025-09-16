// src/routes/app.routes.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import SignIn from "../pages/SignIn";

// Tipagem dos nomes das rotas
export type RootStackParamList = {
  Dashboard: undefined;
  Order: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard" // app abre direto no Dashboard
      screenOptions={{
        headerStyle: { backgroundColor: "#4CAF50" },
        headerTintColor: "#FFF",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Início" }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ title: "Pedidos" }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
}
