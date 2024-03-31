import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import PostCard from "./PostCard"; // Import the PostCard component

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Add state for refreshing

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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between", marginTop: 50 }}>
      <TouchableOpacity onPress={handleRefresh}>
        <Text></Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Total Posts: {posts.length}</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PostCard post={item} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
  refreshButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  refreshButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
