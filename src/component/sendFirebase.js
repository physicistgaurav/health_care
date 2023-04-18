import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { firebase } from "../firebase/config";

const sendFirebase = () => {
  const [addName, setAddName] = useState("");
  const firebaseAdd = firebase.firestore().collection("New");

  const [data, setData] = useState(null);

  const addField = () => {
    if (addName && addName.length > 0) {
      const data = {
        name: addName,
      };
      Alert.alert("Data Sent");
    }
    firebaseAdd
      .add(data)
      .then((res) => {
        setAddName("");
        Keyboard.dismiss();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={{ margin: 100 }}>
      <TextInput
        value={addName}
        placeholder="enter name"
        onChangeText={(val) => {
          setAddName(val);
        }}
      ></TextInput>
      <TouchableOpacity onPress={addField}>
        <Text> submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default sendFirebase;

const styles = StyleSheet.create({});
