import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";

export type AuthStackParamList = {
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: { backgroundColor: "#4CAF50" },
        headerTintColor: "#FFF",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
}
