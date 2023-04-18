import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { firebase } from "../firebase/config";

const Test = () => {
  const [myData, setMyData] = useState([]);
  const fetchFirebaseDetails = firebase.firestore().collection("test");

  const handleFirebaseFetching = () => {
    setMyData([]);
    fetchFirebaseDetails.onSnapshot((query) => {
      let _tempData = [];
      query.forEach((doc) => {
        _tempData.push({ ...doc.data() });
      });
      setMyData(_tempData);
    });
  };

  useEffect(() => {
    handleFirebaseFetching();
  }, []);

  return (
    <View style={{ margin: 100 }}>
      <Text>get data from firebase</Text>
      {myData.map((item) => (
        <Text>{item.name}</Text>
      ))}
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
