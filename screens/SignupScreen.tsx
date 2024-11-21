import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    });

    return unsubscribe;
  }, [navigation]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^\d{8,}$/; // password must be at least 8 digits and digits only
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Oops!", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Oops!", "Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert("Oops!", "Password must be at least 8 digits and contain digits only.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Oops!", "Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert("Success");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>
          Welcome to <Text style={styles.boldText}>BOOKJour!</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email*"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="At Least 8 Digit Password*"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password*"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Log in
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBCAFF",
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
  boldText: {
    fontWeight: "bold",
    color: "#8E44AD",
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

export default SignupScreen;
