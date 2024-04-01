import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import PostCard from "./PostCard"; // Import the PostCard component
import EditModal from "./EditModal";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Add state for refreshing
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

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

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const openEditModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const foods = [
    {
      id: 1,
      title: "Chicken",
      description:
        "Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. They are one of the most common and widespread domestic animals, with a total population of 23.7 billion as of 2018.",
      expiryDate: "April 5, 2024",
      image:
        "https://media.istockphoto.com/id/1282866808/photo/fresh-raw-chicken.jpg?s=612x612&w=0&k=20&c=QtfdAhdeIGpR3JUNDmYFo6cN0el8oYMcOXMQI7Qder4=",
    },
    {
      id: 2,
      title: "Tomatoes",
      description:
        "Tomatoes are the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant.",
      expiryDate: "April 7, 2024",
      image:
        "https://media.istockphoto.com/id/1198016565/photo/red-pepper-isolated-on-a-white-background-top-view.jpg?s=612x612&w=0&k=20&c=a7aT5WZmg6bPHucZuyrF-aBtKrEMWoM-WBZUIm1XQeI=",
    },
    // Add other food items
  ];

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.searchInput}
        placeholder="Search by title..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      /> */}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search here ..."
          onChangeText={setSearchQuery}
        />
      </View>

      <TouchableOpacity onPress={handleRefresh}>
        <Text></Text>
      </TouchableOpacity>
      <Text style={styles.heading}>
        Total Posts: {searchQuery ? filteredPosts.length : posts.length}
      </Text>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard post={item} openEditModal={openEditModal} foods={foods} />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <EditModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        post={selectedPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    paddingHorizontal: 10,
  },
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;
