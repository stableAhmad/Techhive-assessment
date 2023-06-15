import React, { useState, useEffect } from "react";
import {
     SafeAreaView,
     Text,
     TouchableOpacity,
     View,
     ScrollView,
     TouchableWithoutFeedback,
     Alert,
     Button,
     TextInput,
} from "react-native";
import styles from "./styles";
import axios from "axios";
import moment from "moment";
import Modal from "react-native-modal";

export function Lists(props) {
     const [collections, setCollections] = useState([]);
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [newCollectionTitle, setCollectionTitle] = useState("");

     const deleteCollection = async (colID) => {
          let res;
          try {
               res = axios.delete(
                    `https://to-do-list-api.up.railway.app/list/delete/${colID}`
               );
          } catch (error) {
               console.log("axios request failed");
          }
          console.log(colID);
          await fetchData();
     };
     const user = props.navigation.state.params.user;
     const fetchData = async () => {
          await axios
               .get(`https://to-do-list-api.up.railway.app/list/get/${user.id}`)
               .then((response) => {
                    setCollections(response.data);
               })
               .catch((error) => {
                    console.error(error);
               });
     };
     const collectionPress = (collectionId) => {
          const collection = collections.find((c) => c.id === collectionId);
          props.navigation.navigate("ViewCollection", { collection });
     };

     const submitNewCollection = async () => {
          setIsModalVisible(false);
          let res;
          const date = new Date();
          const col = {
               title: newCollectionTitle,
               date: date.toISOString(),
               userID: user.id,
          };
          try {
               res = axios.post(
                    `https://to-do-list-api.up.railway.app/list/post`,
                    col
               );
          } catch (error) {
               console.log("axios request failed");
          }
          await fetchData();
     };
     function addCollectionPress() {
          setIsModalVisible(true);
     }

     useEffect(() => {
          axios.get(`https://to-do-list-api.up.railway.app/list/get/${user.id}`)
               .then((response) => {
                    setCollections(response.data);
               })
               .catch((error) => {
                    console.error(error);
               });
     }, [collections]);

     return (
          <ScrollView
               contentContainerStyle={{
                    minHeight: "100%",
                    backgroundColor: "#18191E",
                    alignItems: "center",
                    justifyContent: "flex-start",
               }}
          >
               <TouchableOpacity
                    style={[
                         styles.signUpButton,
                         styles.addButton,
                         { width: "50%" },
                    ]}
                    onPress={addCollectionPress}
               >
                    <Text style={styles.addButtonText}>Add collection</Text>
               </TouchableOpacity>
               <Modal
                    style={{
                         flex: 1,

                         justifyContent: "center",
                         alignItems: "center",
                    }}
                    isVisible={isModalVisible}
               >
                    <TextInput
                         style={styles.textInput}
                         placeholder="Collection title"
                         placeholderTextColor="grey"
                         value={newCollectionTitle}
                         onChangeText={(text) => setCollectionTitle(text)}
                    />
                    <TouchableOpacity
                         onPress={() => {
                              submitNewCollection();
                         }}
                         style={{
                              backgroundColor: "white",
                              width: "50%",
                              borderRadius: 10,
                              paddingVertical: 10,
                              marginTop: 15,
                         }}
                    >
                         <Text style={{ textAlign: "center" }}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         onPress={() => {
                              setIsModalVisible(false);
                         }}
                         style={{
                              backgroundColor: "white",
                              width: "50%",
                              borderRadius: 10,
                              paddingVertical: 10,
                              marginTop: 15,
                         }}
                    >
                         <Text style={{ textAlign: "center" }}>Close</Text>
                    </TouchableOpacity>
               </Modal>
               {
                    <View style={{ width: "75%" }}>
                         {collections.length > 0 ? (
                              collections.map((collection) => (
                                   <TouchableWithoutFeedback
                                        onPress={() =>
                                             collectionPress(collection.id)
                                        }
                                        key={collection.id}
                                   >
                                        <View style={styles.collection}>
                                             <Text
                                                  style={styles.innerCollection}
                                             >
                                                  {collection.title}
                                             </Text>
                                             <Text
                                                  style={styles.innerCollection}
                                             >
                                                  {moment(
                                                       collection.date
                                                  ).format("YYYY-MM-DD")}
                                             </Text>
                                             <TouchableOpacity
                                                  onPress={() => {
                                                       deleteCollection(
                                                            collection.id
                                                       );
                                                  }}
                                             >
                                                  <Text
                                                       style={[
                                                            styles.innerCollection,
                                                            { color: "red" },
                                                       ]}
                                                  >
                                                       Delete
                                                  </Text>
                                             </TouchableOpacity>
                                        </View>
                                   </TouchableWithoutFeedback>
                              ))
                         ) : (
                              <Text style={styles.header}>
                                   No collections found for this user
                              </Text>
                         )}
                    </View>
               }
          </ScrollView>
     );
}

Lists.navigationOptions = {
     title: "Collections",
};

export default Lists;
