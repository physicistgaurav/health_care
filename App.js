import React from "react";
import { LogBox, SafeAreaView, StyleSheet, Text, View } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import GuestStack from "./src/navigation/GuestStack";
import AppStack from "./src/navigation/AppStack";

// import { config } from "dotenv";
// config();

const AppContent = () => {
  const { loggedInUser } = useAuth();
  return (
    <NavigationContainer>
      {!!loggedInUser ? <AppStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
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
