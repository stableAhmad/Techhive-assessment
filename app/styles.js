import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
     Screen: {
          backgroundColor: "#18191E",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     Buttons: {
          backgroundColor: "#4A66F5",
          width: "75%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          paddingVertical: 10,
          marginTop: 60,
     },
     text: {
          color: "white",
          fontSize: 18,
          textAlign: "center",
     },
     textInput: {
          backgroundColor: "#242A34",
          borderWidth: 1,
          width: "75%",
          color: "white",
          borderColor: "#18191E",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginBottom: 10,
     },
     common: {
          justifyContent: "center",
          alignItems: "center",
     },
     header: {
          color: "white",
          marginBottom: 90,
          fontSize: 40,
          fontWeight: "bold",
     },
     buttonText: {
          fontSize: 18,
          fontWeight: "bold",
          color: "white",
     },
     buttonText2: {
          fontSize: 15,
          color: "white",
     },
     startRight: {},
     signUpButton: {
          marginTop: 10,
     },
     collectionScreen: {
          backgroundColor: "#18191E",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
     },
     addButton: {
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 30,
     },
     addButtonText: {
          color: "black",
          padding: 15,
          fontSize: 20,
     },
     collectionView: {
          backgroundColor: "orange",
          borderColor: "black",
          height: "60%",
          width: "100%",
     },
     collection: {
          backgroundColor: "#242A34",
          width: "100%",
          borderRadius: 10,
          color: "white",
          padding: 30,
          marginTop: 20,
          marginBottom: 20,
     },
     element: {
          backgroundColor: "#242A34",
          width: "100%",
          borderRadius: 10,
          color: "white",
          padding: 30,
          marginTop: 20,
          marginBottom: 20,
     },
     innerCollection: {
          color: "white",
          fontSize: 27,
     },
     innerElement: {
          fontSize: 25,
          color: "white",
          padding: 5,
     },
});

export default styles;
