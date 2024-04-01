import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params;

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Show a confirmation dialog before logging out
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              await firebase.auth().signOut();
              console.log("User signed out!");
              navigation.navigate("Welcome");
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Function to handle navigation to Contact Us screen
  // const handleContactUs = () => {
  //   navigation.navigate("ContactUs");
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Welcome {user.username || user.email}</Text>
      <TouchableOpacity
        style={styles.contactContainer}
        // onPress={handleContactUs}
      >
        <Text style={styles.contactText}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contactContainer: {
    marginBottom: 20,
  },
  contactText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProfileScreen;
