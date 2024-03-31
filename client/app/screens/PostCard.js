import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

// setPosts
const PostCard = ({ post, openEditModal }) => {
  const [loading, setLoading] = useState(false);

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

  // delete post data

  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://192.168.2.115:8080/api/v1/post/delete-post/${id}`
      );
      // setPosts(post.filter((post) => post._id !== id));
      setLoading(false);
      alert(data.message);
      // setPosts(prevPosts => prevPosts.filter(item => item._id !== id));
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(
        error.response.data.message || error.message || "An error occurred"
      );
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postContent}>
        <View style={styles.rightSide}>
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
        </View>
      </View>
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
  postTitle: { fontWeight: "bold", paddingBottom: 10, borderBottomWidth: 0.3 },
  postDescription: { marginVertical: 10 },
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
});

export default PostCard;
