import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  Modal,
  Image,
  Alert,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

import { firebase } from "../firebase/config";

const AppointmentForm = ({ onClose, doctor }) => {
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // const firebaseAdd = firebase.firestore().collection("Appointments");
  // const [data, setData] = useState({});

  const addField = () => {
    if (firstname && firstname.length > 0) {
      const newData = {
        firstname: firstname,
        lastname: lastname,
        address: address,
        phone: phone,
        date: selectedDate,
        doctor: doctor.trim(),
      };
      console.log(newData);
      Alert.alert("Data Sent");
      firebase
        .firestore()
        .collection("Appointments")
        .add(newData)
        .then((res) => {
          setFirstName("");
          setLastName("");
          setAddress("");
          setPhone("");
          setSelectedDate(null);
          setShowModal(false);
          Keyboard.dismiss();
          onClose();
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      Alert.alert("Please enter your first name");
    }
  };

  const handleDayPress = (date) => {
    setSelectedDate(date.dateString);
    setShowModal(false);
  };

  const inputRef = React.useRef();
  return (
    <>
      <MyStatusBar backgroundColor="#2596be" barStyle="light-content" />
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headText}>Book Now</Text>
          <TouchableOpacity onPress={onClose}>
            <Image
              style={styles.close}
              source={require("../assets/close.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => inputRef.current.focus()}
          style={styles.inputView}
        >
          <TextInput
            ref={inputRef}
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            onChangeText={(firstname) => setFirstName(firstname)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => inputRef.current.focus()}
          style={styles.inputView}
        >
          <TextInput
            ref={inputRef}
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            onChangeText={(lastname) => setLastName(lastname)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => inputRef.current.focus()}
          style={styles.inputView}
        >
          <TextInput
            ref={inputRef}
            style={styles.TextInput}
            placeholder="Address"
            placeholderTextColor="#003f5c"
            onChangeText={(address) => setAddress(address)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => inputRef.current.focus()}
          style={styles.inputView}
        >
          <TextInput
            ref={inputRef}
            style={styles.TextInput}
            placeholder="Phone"
            placeholderTextColor="#003f5c"
            keyboardType="numeric"
            onChangeText={(phone) => setPhone(phone)}
          />
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.touchop}
          >
            <Text style={styles.mytext}>
              {selectedDate ? selectedDate : "Pick Date"}
            </Text>
          </TouchableOpacity>
          <Modal visible={showModal} animationType="fade">
            <Calendar
              style={styles.calendar}
              onDayPress={handleDayPress}
              onMonthChange={() => {}}
              initialDate={"2023-03-01"}
              minDate={"2023-01-01"}
              maxDate={"2024-12-30"}
              hideExtraDays={true}
            />
          </Modal>
        </View>
        <TouchableOpacity style={styles.BookButton} onPress={addField}>
          <Text style={styles.BookText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AppointmentForm;

const styles = StyleSheet.create({
  headText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
    marginLeft: 20,
    textDecorationLine: "underline",
  },
  close: {
    height: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 200,
  },

  closeButtonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  inputView: {
    borderWidth: 1,
    borderColor: "#331ece",
    borderRadius: 24,
    width: "80%",
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  TextInput: {
    height: 50,
    flex: 1,
  },
  touchop: {
    borderWidth: 1,
    borderColor: "#331ece",
    borderRadius: 24,
    width: "80%",
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 40,
  },
  BookButton: {
    backgroundColor: "#2557da",
    borderRadius: 15,
    padding: 10,
    margin: 14,
  },
  BookText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
