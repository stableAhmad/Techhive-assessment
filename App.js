import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { Home } from "./app/Home.js";
import Navigator from "./routes/homeStack";
import Toast from "react-native-toast-message";

console.disableYellowBox = true;

export default function App() {
     return <Navigator />;
}
