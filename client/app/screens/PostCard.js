import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image,
} from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PostCard = ({ post, openEditModal, foods }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeletePrompt = async (id) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => handleDeletePost(id) },
    ]);
  };

  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://192.168.2.115:8080/api/v1/post/delete-post/${id}`
      );
      setLoading(false);
      alert(data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(
        error.response.data.message || error.message || "An error occurred"
      );
    }
  };

  const openFoodList = () => {
    setModalVisible(true);
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodTitle}>{item.title}</Text>
        <Text style={styles.foodDescription}>{item.description}</Text>
        <Text style={styles.expiryDate}>Expiry Date: {item.expiryDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.postContainer}>
      <View style={styles.postContent}>
        <View style={styles.rightSide}>
          <TouchableOpacity onPress={openFoodList}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              style={{ textAlign: "right", position: "relative", top: 0 }}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openEditModal(post)}>
            <Ionicons
              name="create-outline"
              style={styles.editButtonText}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeletePrompt(post._id)}>
            <Ionicons name="trash" style={styles.deleteButtonText} size={20} />
          </TouchableOpacity>
          <Text style={styles.postDate}>
            Posted on: {moment(post.createdAt).format("DD:MM:YYYY")}
          </Text>
        </View>

        <View>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.description}</Text>
          <View style={styles.loc}>
            <Ionicons name="pin-outline" size={15} color="black" />
            <Text style={styles.postLocation}>{post.location}</Text>
          </View>
          <View>
            <Text style={styles.postLocation}>
              Date: {new Date(post.date).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Food List Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={foods}
              renderItem={renderFoodItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: { color: "green" },

  postContainer: {
    width: "90%",
    height: "auto",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    flex: 1,
    borderRadius: 5,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
  },

  postContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },

  rightSide: {
    flexDirection: "column",
    right: 10,
    position: "relative",
    width: 100,
  },
  postTitle: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    fontSize: 20,
  },

  postDescription: { marginVertical: 10, fontSize: 15 },
  loc: { flexDirection: "row", fontSize: 10, marginTop: 10 },

  postLocation: { marginTop: 0 },

  postDate: {
    color: "gray",
    fontSize: 9,
    marginTop: 0,
    position: "absolute",
    bottom: -10,
    right: 0,
  },

  editButtonText: {
    color: "darkblue",
    borderRadius: 5,
    textAlign: "right",
    marginRight: 0,
    marginBottom: 10,
  },

  deleteButtonText: {
    color: "red",

    borderRadius: 5,

    textAlign: "right",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  foodItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  foodImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  foodInfo: {
    flex: 1,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  foodDescription: {
    fontSize: 16,
    color: "gray",
  },
  expiryDate: {
    fontSize: 14,
    color: "red",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PostCard;
