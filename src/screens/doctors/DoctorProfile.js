import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import { firebase } from "../../firebase/config";

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

  return (
    <View>
      {/* <Text>{doctorDetails.name}</Text>
      <Text>{doctorDetails.rating}</Text> */}
    </View>
  );
};

export default DoctorProfile;
