import React from "react";
import { SafeAreaView } from "react-native";

import TelaInicial from "./src/screens/TelaInicial";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TelaInicial />
    </SafeAreaView>
  );
}
