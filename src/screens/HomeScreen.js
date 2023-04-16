import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "react-native-vector-icons";

import { useAuth } from "../contexts/AuthContext";
import { authentication } from "../firebase/config";
import { signOut } from "firebase/auth";

import { firebase } from "../firebase/config";
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from "@expo-google-fonts/ubuntu";
import { useNavigation } from "@react-navigation/native";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const signOutUser = () => {
    signOut(authentication)
      .then((res) => {
        console.log(res);
        setLoggedInUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [query, setQuery] = useState("");
  const [doctorDetails, setDoctorDetails] = useState([]);
  const fetchDoctorDetails = firebase.firestore().collection("doctors");

  const handleDoctorDetails = () => {
    setDoctorDetails([]);
    fetchDoctorDetails.onSnapshot((QuerySnapshot) => {
      let _doctorDetails = [];

      QuerySnapshot.forEach((doc) => {
        _doctorDetails.push({ ...doc.data() });
      });
      setDoctorDetails(_doctorDetails);
    });
  };

  useEffect(() => {
    handleDoctorDetails();
  }, []);

  let [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
  });

  const filteredItems = doctorDetails.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const categories = [
    { id: 1, label: "covid-19", image: require("../assets/covid.png") },
    { id: 2, label: "hospotal", image: require("../assets/hospital.png") },
    { id: 3, label: "ambulance", image: require("../assets/ambulance.png") },
    {
      id: 4,
      label: "pills",
      image: require("../assets/pills.png"),
    },
    {
      id: 5,
      label: "Rehabilitation",
      image: require("../assets/rehabit.png"),
    },
  ];

  // const Doctors = [
  //   {
  //     id: 1,
  //     name: "Dr. Rohit Shrestha",
  //     department: "Orthopedic",
  //     rating: 5,
  //     image: require("../assets/rohitm.png"),
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Smrity Maskey",
  //     department: "Gynaecology",
  //     rating: 4.8,
  //     image: require("../assets/smritym.png"),
  //   },

  //   {
  //     id: 3,
  //     name: "Dr. Umid Shrestha",
  //     department: "Hepatology",
  //     rating: 4.5,
  //     image: require("../assets/umidm.png"),
  //   },
  //   {
  //     id: 4,
  //     name: "Dr. Mahesh Dahal",
  //     department: "Endocrinology",
  //     rating: 4.2,
  //     image: require("../assets/maheshm.png"),
  //   },
  //   {
  //     id: 5,
  //     name: "Dr. Jebina Lama",
  //     department: "Dermatology",
  //     rating: 4,
  //     image: require("../assets/jebinam.png"),
  //   },

  //   {
  //     id: 6,
  //     name: "Dr. Bhola Rial",
  //     department: "Gynaecology",
  //     rating: 4.6,
  //     image: require("../assets/bholam.png"),
  //   },
  // ];

  const Card = ({ name, department, rating, image, screenName }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(screenName)}
        style={styles.DoctorCard}
      >
        <Image source={{ uri: image }} style={styles.DoctorImage} />
        <Text style={styles.DoctorName}>{name}</Text>
        <Text style={styles.DoctorDepartment}>{department}</Text>
        <Text style={styles.DoctorRating}>{rating} ⭐</Text>
      </TouchableOpacity>
    );
  };

  const renderCard = ({ item }) => <Card {...item} />;

  return (
    <>
      <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={{ fontFamily: "Ubuntu_400Regular", fontSize: 24 }}>
              Hello Gaurav
            </Text>
            <View style={styles.avatar}>
              <Image
                source={require("../assets/user.jpg")}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            </View>
          </View>
          <View style={styles.searchContainer}>
            <FontAwesome
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search your doctor"
              style={styles.inputBox}
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
            <Icon name="sliders" size={30} color="grey" style={styles.icon} />
          </View>
          <View style={styles.row}>
            <View style={styles.card1}>
              <Image
                source={require("../assets/clinic.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Clinic Visit</Text>
              <Text style={styles.cardDescription}>
                Visit your doctor in the clinic
              </Text>
            </View>
            <View style={styles.card}>
              <Image
                source={require("../assets/home.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Home Visit</Text>
              <Text style={styles.cardDescription}>
                Schedule a doctor visit at home
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: "Ubuntu_700Bold",
              fontSize: 24,
              margin: 10,
            }}
          >
            Services
          </Text>
          <View style={{ width: "100%", height: 120 }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.categoryContainer}>
                  <TouchableOpacity>
                    <View
                      style={[
                        styles.barCard,
                        { width: Dimensions.get("window").width / 4 },
                      ]}
                    >
                      <Image style={styles.categoryImage} source={item.image} />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.categoryLabel}>{item.label}</Text>
                </View>
              )}
            />
          </View>

          <Text
            style={{
              fontFamily: "Ubuntu_700Bold",
              fontSize: 24,
              margin: 10,
            }}
          >
            Popular Doctors
          </Text>
          <View style={styles.DoctorContainer}>
            <FlatList
              data={filteredItems}
              renderItem={renderCard}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eceff7",
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  inputBox: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "black",
  },
  icon: {
    paddingHorizontal: 5,
    paddingRight: 15,
  },
  searchIcon: {
    paddingRight: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  iconcard: {
    marginRight: 10,
    fontSize: 20,
    color: "#000",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
  },
  subtext: {
    color: "#999",
    fontSize: 14,
    lineHeight: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  categoryContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  barCard: {
    backgroundColor: "#deded7",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 5,
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  categoryLabel: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    fontFamily: "Ubuntu_400Regular",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  card1: {
    backgroundColor: "#5ad3f3",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "45%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "45%",
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Ubuntu_500Medium",
  },
  cardDescription: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Ubuntu_400Regular",
  },
  DoctorContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  DoctorCard: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#deded7",
    borderRadius: 10,
    alignItems: "center",
  },
  DoctorImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  DoctorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  DoctorDepartment: {
    fontSize: 16,
    marginBottom: 5,
  },
  DoctorRating: {
    fontSize: 14,
    color: "gray",
  },
});
