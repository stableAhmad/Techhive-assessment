import React, { useState } from "react";
import {
     View,
     SafeAreaView,
     Text,
     TextInput,
     TouchableOpacity,
     StyleSheet,
} from "react-native";
import styles from "./styles.js";
import Validation from "./Validation";
import axios from "axios";
import Toast from "react-native-simple-toast";

export function Home(props) {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const loginButtonPress = async () => {
          const validator = new Validation(email, password);
          const result = validator.validate();
          if (!result) {
               return;
          }
          let res;
          try {
               const link = `https://to-dod.up.railway.app/user/get/${email}`;

               res = await axios.get(link);
          } catch (error) {
               console.log("axios request failed");
          }
          const user = res.data;
          console.log(res.data);
          if (user.password === password) {
               props.navigation.navigate("lists", { user });
          } else {
               Toast.show("invalid credentials", Toast.SHORT);
          }
     };
     const navigateSignUp = () => {
          props.navigation.navigate("signupScreen");
     };
     return (
          <SafeAreaView style={styles.Screen}>
               <View>
                    <Text style={styles.header}>To-Do App</Text>
               </View>
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

               <TouchableOpacity
                    onPress={loginButtonPress}
                    style={styles.Buttons}
               >
                    <Text style={[styles.text, styles.buttonText]}>Log in</Text>
               </TouchableOpacity>
               <TouchableOpacity
                    onPress={navigateSignUp}
                    style={styles.signUpButton}
               >
                    <Text style={styles.buttonText2}>Create an account</Text>
               </TouchableOpacity>
          </SafeAreaView>
     );
}

Home.navigationOptions = {
     title: "Log In",
};

export default Home;
