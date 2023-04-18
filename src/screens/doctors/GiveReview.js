import { TextInput } from "@react-native-material/core";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import { Header } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { firebase } from "../../firebase/config";

const GiveReview = ({ route }) => {
  const { refId } = route.params;
  console.log(refId);
  const reviewAdd = firebase.firestore().collection("reviews");
  const [addName, setaddName] = useState("");
  const [addReview, setaddReview] = useState("");
  const [addRating, setaddRating] = useState("");

  const addField = () => {
    if (addName && addName.length > 0) {
      const data = {
        reviewer: addName,
        review: addReview,
        reviewRating: addRating,
        referenceDoc: refId.trim(),
      };

      Alert.alert(
        "Data Sent",
        "Your data has been sent in firebase successfully!"
      );

      reviewAdd
        .add(data)
        .then((res) => {
          setaddName("");
          setaddReview("");
          setaddRating("");

          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Header
            leftComponent={{ icon: "menu", color: "#fff" }}
            centerComponent={{
              text: "Health Care Nepal",
              style: {
                color: "#fff",
                fontSize: 20,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 50,
              },
            }}
          />
          <View style={styles.body}>
            <Text style={styles.heading}>Give Review</Text>
            <Text style={styles.formtitletexts}>Your Name</Text>
            <TextInput
              value={addName}
              style={styles.formtitle}
              placeholder="Enter your name"
              placeholderTextColor="grey"
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              backgroundColor="white"
              focusColor="blue"
              onChangeText={(reviewer) => {
                setaddName(reviewer);
              }}
            ></TextInput>
            <Text style={styles.formtitletexts}>Review:</Text>
            <TextInput
              value={addReview}
              style={styles.formtitle}
              placeholder="Enter your review"
              placeholderTextColor="grey"
              // label="title"
              backgroundColor="white"
              underlineColorAndroid="transparent"
              // focusColor="blue"
              onChangeText={(review) => {
                setaddReview(review);
              }}
            ></TextInput>
            <Text style={styles.formtitletexts}>Rating</Text>
            {addRating >= 1 && addRating <= 5 ? (
              <TouchableOpacity
                onPress={() => {
                  setaddRating("");
                }}
              >
                <TextInput
                  value={addRating}
                  style={styles.ratingInput}
                  placeholder="Edit your rating"
                  placeholderTextColor="grey"
                  keyboardType="numeric"
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                  }}
                  backgroundColor="white"
                  focusColor="blue"
                  onChangeText={(reviewRating) => {
                    if (reviewRating >= 1 && reviewRating <= 5) {
                      setaddRating(reviewRating);
                    } else {
                      setaddRating("");
                    }
                  }}
                ></TextInput>
              </TouchableOpacity>
            ) : (
              <TextInput
                value={addRating}
                style={styles.formtitle}
                placeholder="Give your rating"
                placeholderTextColor="grey"
                keyboardType="numeric"
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                backgroundColor="white"
                focusColor="blue"
                onChangeText={(reviewRating) => {
                  if (reviewRating >= 1 && reviewRating <= 5) {
                    setaddRating(reviewRating);
                  } else {
                    setaddRating("");
                  }
                }}
              ></TextInput>
            )}

            <TouchableOpacity style={styles.btn} onPress={addField}>
              <FontAwesome
                name="send"
                size={20}
                color="#8ec7cf"
                style={styles.print}
              />
              <Text style={styles.btntext}>submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GiveReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    margin: 20,
  },
  heading: {
    color: "crimson",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 3,
  },
  formtitletexts: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  formtitle: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.3,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8ec7cf",
    width: 180,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  print: {
    marginRight: 10,
    paddingLeft: 5,
  },
  btntext: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#8ec7cf",
  },
  dropdownselector: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    width: 15,
    height: 15,
  },
  dropdownArea: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,

    backgroundColor: "red",
    elevation: 5,
  },
  searchInput: {
    width: "100%",
    backgroundColor: "blue",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "blue",
    marginTop: 10,
  },
});
