// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";

// const Menu = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.menuContainer}>
//       <View style={styles.topLine} />

//       <TouchableOpacity
//         style={styles.buttonStyle}
//         onPress={() => navigation.navigate("home")}
//       >
//         <Image
//           style={styles.iconStyle}
//           source={{
//             uri: "https://img.icons8.com/officel/1x/home.png",
//           }}
//         />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.buttonStyle}
//         onPress={() => navigation.navigate("about")}
//       >
//         <Image
//           style={styles.iconStyle}
//           source={{
//             uri: "https://img.icons8.com/nolan/256/messages-mac.png",
//           }}
//         />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.buttonStyle}
//         onPress={() => navigation.navigate("home")}
//       >
//         <Image
//           style={styles.iconStyle}
//           source={{
//             uri: "https://img.icons8.com/officel/256/overtime.png",
//           }}
//         />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.buttonStyle}
//         onPress={() => navigation.navigate("about")}
//       >
//         <Image
//           style={styles.iconStyle}
//           source={{
//             uri: "https://img.icons8.com/external-xnimrodx-blue-xnimrodx/256/external-setting-advertising-xnimrodx-blue-xnimrodx.png",
//           }}
//         />
//       </TouchableOpacity>
//       <View style={styles.separator} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   menuContainer: {
//     position: "absolute",
//     bottom: 30,
//     width: "100%",
//     height: 60,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
//   buttonStyle: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   iconStyle: {
//     width: 50,
//     height: 50,
//   },
//   topLine: {
//     position: "absolute",
//     top: 1,
//     width: "78%",
//     height: 1,
//     backgroundColor: "#ccc",
//   },
// });

// export default Menu;
