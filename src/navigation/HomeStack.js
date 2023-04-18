import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DoctorProfile from "../screens/doctors/DoctorProfile";
import GiveReview from "../screens/doctors/GiveReview";
import ViewReviews from "../screens/doctors/ViewReviews";

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
        name="doctorProfile"
        component={DoctorProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="giveReview"
        component={GiveReview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="viewReview"
        component={ViewReviews}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
