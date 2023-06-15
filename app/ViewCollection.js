import React, { useState } from "react";
import {
     SafeAreaView,
     Text,
     ScrollView,
     View,
     TouchableOpacity,
     TextInput,
     TouchableWithoutFeedback,
} from "react-native";
import moment from "moment";
import styles from "./styles";
import Modal from "react-native-modal";
import axios from "axios";

export function ViewCollection(props) {
     const [allElements, setElements] = useState(
          props.navigation.state.params.collection.elements
     );
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [newElementTitle, setNewElementTitle] = useState();
     const [newElementDescription, setNewElementDescription] = useState();

     const collection = props.navigation.state.params.collection;

     const addElementPress = () => {
          setIsModalVisible(true);
     };

     const submitNewElement = async () => {
          const date = new Date();
          const newElem = {
               title: newElementTitle,
               description: newElementDescription,
               due_date: date.toISOString(),
               date_created: date.toISOString(),
               state: false,
               ListId: collection.id,
          };

          let res;

          try {
               res = await axios.post(
                    "https://to-do-list-api.up.railway.app/list/element/post",
                    newElem
               );
          } catch (error) {
               console.log("axious request failed");
          }
          newElem.id = res.data;
          let newElements = allElements.push(newElem);
          console.log(res.data);

          setIsModalVisible(false);
     };

     const close = () => {
          setIsModalVisible(false);
     };

     const crossElem = (id) => {
          try {
               axios.delete(
                    `https://to-do-list-api.up.railway.app/list/element/delete/${id}`
               );
          } catch (error) {
               console.log("axios request failed");
          }
          const afterDeletion = allElements.filter((item) => item.id !== id);
          setElements(afterDeletion);
     };
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
                    onPress={addElementPress}
               >
                    <Text style={styles.addButtonText}>Add Element</Text>
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
                         value={newElementTitle}
                         onChangeText={(text) => setNewElementTitle(text)}
                    />
                    <TextInput
                         style={styles.textInput}
                         placeholder="Description"
                         placeholderTextColor="grey"
                         value={newElementDescription}
                         onChangeText={(text) => setNewElementDescription(text)}
                    />

                    <TouchableOpacity
                         style={{
                              backgroundColor: "white",
                              width: "50%",
                              borderRadius: 10,
                              paddingVertical: 10,
                              marginTop: 15,
                         }}
                         onPress={submitNewElement}
                    >
                         <Text style={{ textAlign: "center" }}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={{
                              backgroundColor: "white",
                              width: "50%",
                              borderRadius: 10,
                              paddingVertical: 10,
                              marginTop: 15,
                         }}
                         onPress={close}
                    >
                         <Text style={{ textAlign: "center" }}>Close</Text>
                    </TouchableOpacity>
               </Modal>
               {
                    <View style={{ width: "100%" }}>
                         {allElements.length > 0 ? (
                              allElements.map((elem) => (
                                   <TouchableWithoutFeedback key={elem.id}>
                                        <View style={styles.element}>
                                             <Text style={styles.innerElement}>
                                                  {elem.title}
                                             </Text>
                                             <Text style={styles.innerElement}>
                                                  {elem.description}
                                             </Text>
                                             <Text style={styles.innerElement}>
                                                  Created:{" "}
                                                  {moment(
                                                       elem.date_created
                                                  ).format("YYYY-MM-DD")}
                                             </Text>
                                             <TouchableOpacity
                                                  onPress={() => {
                                                       crossElem(elem.id);
                                                  }}
                                             >
                                                  <Text
                                                       style={[
                                                            styles.innerElement,
                                                            { color: "red" },
                                                       ]}
                                                  >
                                                       Cross from list
                                                  </Text>
                                             </TouchableOpacity>
                                        </View>
                                   </TouchableWithoutFeedback>
                              ))
                         ) : (
                              <Text style={[styles.header, { marginTop: 10 }]}>
                                   This List is empty
                              </Text>
                         )}
                    </View>
               }
          </ScrollView>
     );
}

export default ViewCollection;
