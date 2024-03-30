import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

const PostCard = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>
      <View style={styles.loc}>
        <Ionicons name="pin-outline" size={15} color="black" />
        <Text style={styles.postLocation}>{post.location}</Text>
      </View>
      <Text style={styles.postDate}>
        Posted on: {moment(post.createdAt).format("DD:MM:YYYY, h:mm:ss a")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: { color: "green" },
  postContainer: {
    width: "97%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    flex: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  postTitle: { fontWeight: "bold", paddingBottom: 10, borderBottomWidth: 0.3 },
  postDescription: { marginTop: 10 },
  loc: { flexDirection: "row", fontSize: 10, marginTop: 10 },
  postLocation: { marginTop: 0 },
  postDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});

export default PostCard;
