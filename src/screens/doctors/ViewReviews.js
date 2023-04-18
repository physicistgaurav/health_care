import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Divider } from "react-native-elements";

import { firebase } from "../../firebase/config";

const ViewReviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const fetchReviews = firebase.firestore().collection("reviews");

  const handleFetchReviews = () => {
    setMyReviews([]);
    fetchReviews.onSnapshot((QuerySnapshot) => {
      let _ticketsIssues = [];

      QuerySnapshot.forEach((doc) => {
        _ticketsIssues.push({ ...doc.data() });
      });
      setMyReviews(_ticketsIssues);
    });
  };

  useEffect(() => {
    handleFetchReviews();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>All Reviews</Text>
          <Divider
            style={{ marginLeft: 10, marginRight: 10, marginBottom: 20 }}
          ></Divider>
          {myReviews.map((reviewList) => (
            <View key={reviewList.id} style={styles.ticketshelpContainer}>
              <Text style={styles.reviewTitle}>
                {" "}
                Name: {reviewList.reviewer}
              </Text>
              <Text style={styles.reviewDescription}>
                Review: {reviewList.review}
              </Text>
              <Text style={styles.reviewDescription}>
                Rating: {reviewList.reviewRating}
              </Text>
              <Divider
                style={{
                  height: 2,
                  backgroundColor: "black",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2596be",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  reviewDescription: {
    color: "#555",
    paddingLeft: 5,
    fontSize: 20,
  },
});
