import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";
import axios from "axios";
import PostCard from "./PostCard"; // Import the PostCard component

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts data from backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.2.115:8080/api/v1/post/get-post"
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "space-between", marginTop: 50 }}>
      <Text style={styles.heading}>Total Posts: {posts.length}</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PostCard post={item} />} // Pass post data as prop to PostCard
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    color: "green",
    textAlign: "center",
  },
});

export default HomeScreen;
