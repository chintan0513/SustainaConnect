import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const FoodLists = () => {
  const navigation = useNavigation();

  const foods = [
    {
      id: 1,
      title: "Poutine",
      description:
        "A Canadian dish consisting of french fries and cheese curds topped with a brown gravy.",
      expiryDate: "April 5, 2024",
      image: "https://via.placeholder.com/150", // Dummy image URL
    },
    {
      id: 2,
      title: "BeaverTails",
      description:
        "A Canadian pastry, hand-stretched to resemble the tail of a beaver and topped with various sweet toppings.",
      expiryDate: "April 7, 2024",
      image: "https://via.placeholder.com/150", // Dummy image URL
    },
    // Add other food items with dummy image URLs
  ];

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
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Landing")} // Navigate to the HomeScreen
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={foods}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
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
});

export default FoodLists;
