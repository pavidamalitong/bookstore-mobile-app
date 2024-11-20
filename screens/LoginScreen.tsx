import React, { useState, useEffect } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,ImageBackground,Keyboard,TouchableWithoutFeedback,} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail("");
      setPassword("");
    });
  
    return unsubscribe; // Cleanup the listener
  }, [navigation]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Login successful!");
      navigation.navigate("Success");
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-credential":
          Alert.alert("Login Error", "No account found. Please check your email and password");
          break;
        case "auth/wrong-password":
          Alert.alert("Login Error", "Incorrect password. Please try again");
          break;
        default:
          Alert.alert("Login Error", "Invalid Login. Please try again.");
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false} 
    >
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/bg-login.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Log in</Text>
            <Text style={styles.subtitle}>Salut! Good to see you again</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Don’t have an account?{" "}
              <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
                Sign up
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 17,
    color: "#333",
    marginVertical: 10,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 60,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#FFF",
  },
  button: {
    width: "90%",
    height: 55,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 10,
    marginTop: 60,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#333",
    marginTop: 15,
  },
  link: {
    color: "#8E44AD",
    fontWeight: "bold",
  },
});

export default LoginScreen;
