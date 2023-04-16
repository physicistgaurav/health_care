import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

import { authentication } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setLoggedInUser } = useAuth();

  const inputRef = React.useRef();
  const passwordRef = React.useRef();

  const [acessToken, setAcessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "893295189175-br0gja4o6qc08ngkgtotoo8203mkr1r3.apps.googleusercontent.com",
    iosClientId:
      "893295189175-pi8ucgp4bh519mj7beg7un8osk2h49fq.apps.googleusercontent.com",
    androidClientId:
      "893295189175-hggj5n2s40280qji3n3q7b5jlak486b6.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setAcessToken(response.authentication.accessToken);
      acessToken && fetchUserInfo();
    }
  }, [response, acessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${acessToken}`,
      },
    });
    const userInfo = await response.json();
    setUser(userInfo);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
            Welcome
          </Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
        </View>
      );
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);

    signInWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        console.log("successful");
        setLoggedInUser(res.user);
      })

      .catch((err) => {
        console.log(err);
        setError("Incorrect Email/Password");
      })

      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.headingLabel}>Log in</Text>

        <TouchableOpacity
          onPress={() => inputRef.current.focus()}
          style={styles.inputView}
        >
          <TextInput
            ref={inputRef}
            style={styles.TextInput}
            placeholder="Email"
            defaultValue="gaurav@gmail.com"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => passwordRef.current.focus()}
          style={styles.inputView2}
        >
          <TextInput
            ref={passwordRef}
            style={styles.TextInput}
            placeholder="Password"
            defaultValue="gaurav123"
            placeholderTextColor="#003f5c"
            secureTextEntry={!showPassword}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 15, top: 20 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgot2}>Forgot Password </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.text}>Login</Text>
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="white"
              style={{
                alignSelf: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}
            />
          )}
        </TouchableOpacity>

        <Text
          style={{
            margin: 5,
            color: "#302298",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          or
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={StyleSheet.flatten([styles.iconCircle, { marginRight: 20 }])}
          >
            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <Icon name={"google"} size={20} color="#302298" />
            </TouchableOpacity>
          </View>
          <View
            style={StyleSheet.flatten([
              styles.iconCircle,
              { backgroundColor: "#302298" },
            ])}
          >
            <TouchableOpacity onPress={() => alert("chupchap google chala")}>
              <Icon name={"facebook"} size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.downText}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 40,
  },
  headingLabel: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#331ece",
  },
  inputView: {
    borderWidth: 1,
    borderColor: "#331ece",
    borderRadius: 24,
    width: "80%",
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  inputView2: {
    borderWidth: 1,
    borderColor: "#331ece",
    borderRadius: 24,
    width: "80%",
    height: 60,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  TextInput: {
    height: 50,
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },

  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "78%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    alignSelf: "center",
  },
  forgot: {
    alignSelf: "flex-start",
    marginLeft: 50,
    textDecorationLine: "underline",
    color: "#331ece",
    fontSize: 16,
    fontWeight: "500",
  },
  forgot2: {
    textDecorationLine: "underline",
    color: "#331ece",
    fontSize: 16,
    fontWeight: "500",
  },
  downText: {
    color: "#331ece",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  signup: {
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    color: "#331ece",
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 2,
    marginBottom: 2,
  },
});
