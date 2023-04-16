import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AboutScreen from "../screens/AboutScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MessageScreen from "../screens/MessageScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import SettingScreen from "../screens/SettingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="ios-home" color={"#466eda"} size={24} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="messages"
          component={SettingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="message" size={24} color="#466eda" />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Schedule"
          component={MessageScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" size={24} color="#466eda" />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={ScheduleScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={24} color="#466eda" />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AppStack;
