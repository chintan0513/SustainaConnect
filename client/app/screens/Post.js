import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const Post = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImageAsync = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePost = async () => {
    if (!title || !description || !location || !date || !selectedImage) {
      Alert.alert(
        "Incomplete Data",
        "Please fill all fields and select an image."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", {
        uri: selectedImage,
        type: "image/jpeg",
        name: "image.jpeg",
      });
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("date", date);

      const response = await axios.post(
        "http://192.168.2.115:8080/api/v1/post/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      Alert.alert("Success", response.data.message);
      navigation.navigate("Landing");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.response.data.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Add post title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Add post description"
            multiline
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Add post city name"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Add post date (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
          />
          <TouchableOpacity
            style={styles.btncontainer}
            onPress={pickImageAsync}
          >
            <Text style={{ fontWeight: "bold" }}>Upload Image</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-square" size={18} /> Create post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: "#f1f1f1",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    padding: 7,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "black",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 0,
    borderRadius: 20,
    position: "relative",
    left: -90,
  },
  btncontainer: {
    height: 56,
    width: 120,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    position: "relative",
    left: -100,
    backgroundColor: "lightblue",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    fontWeight: "900",
    elevation: 2,
    marginBottom: 16,
  },
});

export default Post;
