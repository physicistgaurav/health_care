import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { firebase } from "../../firebase/config";

import MapView from "react-native-maps";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const DoctorProfile = ({ route }) => {
  const { refId } = route.params;
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("doctors")
          .doc(refId.trim())
          .get();

        if (snapshot.exists) {
          const doctorDetails = snapshot.data();
          setDoctorDetails(doctorDetails);
        }
      } catch (err) {}
    };

    fetchDoctorDetails();
  }, [refId]);

  if (!doctorDetails) {
    return <ActivityIndicator size="large" />;
  }

  const region = {
    latitude: doctorDetails.latitude,
    longitude: doctorDetails.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const reviewerData = doctorDetails.reviewer.map((reviewer, index) => ({
    reviewer: doctorDetails.reviewer[index],
    reviewRating: doctorDetails.reviewRating[index],
    review: doctorDetails.review[index],
    reviewerImage: doctorDetails.reviewerImage[index],
  }));

  const ReviewCard = ({ name, rating, review, reviewerImage }) => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: reviewerImage }} />
          <Text style={styles.ReviewName}>{name}</Text>
          <Text style={styles.ReviewRating}>{rating}</Text>
        </View>
        <Text style={styles.ReviewDesc}>{review}</Text>
      </View>
    );
  };

  return (
    <>
      <MyStatusBar backgroundColor="#2596be" barStyle="light-content" />
      <ScrollView>
        <View style={styles.upperCOntainer}>
          <Image source={{ uri: doctorDetails.image }} style={styles.image} />
          <Text style={styles.name}>{doctorDetails.name}</Text>
          <Text style={styles.dept}>{doctorDetails.department}</Text>
          <View style={styles.upperIconsContainer}>
            <View style={styles.circular}>
              <Image
                source={require("../../assets/phone.png")}
                style={styles.iconUpper}
              />
            </View>
            <View style={styles.circular}>
              <Image
                source={require("../../assets/messages.png")}
                style={styles.iconUpper}
              />
            </View>
          </View>
        </View>
        <Text style={styles.labelHead}>About Doctor</Text>
        <Text style={styles.desc}>{doctorDetails.description}</Text>
        <Text style={styles.labelHead}>Reviews</Text>
        <View style={styles.container}>
          <FlatList
            horizontal={true}
            data={reviewerData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ReviewCard
                key={index}
                name={item.reviewer}
                rating={item.reviewRating}
                review={item.review}
                reviewerImage={item.reviewerImage}
              />
            )}
          />
        </View>

        <Text style={styles.labelHead}>Location</Text>
        <MapView style={styles.map} region={region} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 15,
          }}
        >
          <Text style={styles.consultation}>Consultation Fee</Text>
          <Text style={styles.fee}>{doctorDetails.fee}</Text>
        </View>
        <TouchableOpacity style={styles.BookButton}>
          <Text style={styles.BookText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  upperCOntainer: {
    height: 280,
    width: "100%",
    backgroundColor: "#63c3e6",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  name: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  dept: {
    fontSize: 18,
    fontWeight: "w600",
    alignSelf: "center",
  },
  upperIconsContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  iconUpper: {
    height: 35,
    width: 35,
  },
  desc: {
    fontSize: 16,
    margin: 10,
  },
  labelHead: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 15,
  },
  circular: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  map: {
    width: 350,
    height: 200,
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c9d1d4",
    height: 170,
    marginTop: 10,
    // margin: 10,
    // borderRadius: 16,
  },
  card: {
    width: 260,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#FFF",
    margin: 10,
    padding: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ReviewName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  ReviewRating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA500",
  },
  ReviewDesc: {
    fontSize: 14,
    textAlign: "justify",
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
  consultation: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },
  fee: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },
});

export default DoctorProfile;
