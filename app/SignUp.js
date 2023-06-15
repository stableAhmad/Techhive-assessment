import React, { useState } from "react";
import {
     View,
     SafeAreaView,
     Text,
     TextInput,
     TouchableOpacity,
     StyleSheet,
     ScrollView,
} from "react-native";
import styles from "./styles.js";
import Validation from "./Validation";
import axios from "axios";

export function SignUp(props) {
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

     const registerButtonPress = () => {
          const validator = new Validation(
               email,
               password,
               firstName,
               lastName,
               confirmPassword,
               false
          );
          const result = validator.validate();
          if (result) {
               const user = {
                    firstName,
                    lastName,
                    email,
                    password,
               };
               try {
                    const response = axios.post(
                         "https://to-dod.up.railway.app/user/post",
                         user
                    );
               } catch (error) {
                    console.log("axios request failed");
               }
               props.navigation.navigate("homeScreen");
          }
     };
     const navigateLogIn = () => {
          props.navigation.navigate("homeScreen");
     };

     return (
          <ScrollView
               contentContainerStyle={{
                    minHeight: "100%",
                    backgroundColor: "#18191E",
                    alignItems: "center",
                    justifyContent: "center",
               }}
          >
               <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    placeholderTextColor="grey"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
               />
               <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    placeholderTextColor="grey"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
               />
               <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
               />
               <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
               />

               <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
               />
               <TouchableOpacity
                    onPress={registerButtonPress}
                    style={styles.Buttons}
               >
                    <Text style={[styles.text, styles.buttonText]}>
                         Register
                    </Text>
               </TouchableOpacity>
               <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={navigateLogIn}
               >
                    <Text style={styles.buttonText2}>
                         Already have an account ?
                    </Text>
               </TouchableOpacity>
          </ScrollView>
     );
}

SignUp.navigationOptions = {
     title: "Register",
};

export default SignUp;
