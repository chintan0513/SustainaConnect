import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModal = ({ modalVisible, setModalVisible, post, navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  //handle update post
  const updatePostHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `http://192.168.2.115:8080/api/v1/post/update-post/${id}`,
        {
          title,
          description,
        }
      );
      setLoading(false);
      alert(data?.message);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
      // navigation.navigate("Landing");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  //inital post data\
  useEffect(() => {
    setTitle(post?.title);
    setDescription(post?.description);
  }, [post]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Update Your Posts</Text>
              <Text>Title</Text>
              <TextInput
                style={styles.inputBox}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
              <Text>Description</Text>
              <TextInput
                style={styles.inputBox}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
              <View style={styles.btnContainer}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    updatePostHandler(post && post._id),
                      setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>
                    {loading ? "Please Wait" : "UPDATE"}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: "top",
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "black",
    elevation: 2,
    width: 100,
    margin: 10,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default EditModal;
