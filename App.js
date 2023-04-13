import React from "react";
import { LogBox, SafeAreaView, StyleSheet, Text, View } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/AppStack";

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
