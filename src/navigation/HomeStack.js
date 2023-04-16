import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Bhola from "../screens/doctors/Bhola";
import Rohit from "../screens/doctors/Rohit";
import Smrity from "../screens/doctors/Smrity";
import Umid from "../screens/doctors/Umid";
import Mahesh from "../screens/doctors/Mahesh";
import Jebina from "../screens/doctors/Jebina";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="bhola"
        component={Bhola}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="rohit"
        component={Rohit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="smrity"
        component={Smrity}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="umid"
        component={Umid}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="mahesh"
        component={Mahesh}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="jebina"
        component={Jebina}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
