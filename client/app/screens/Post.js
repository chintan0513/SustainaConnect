import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

const Post = ({ navigation }) => {
  const [post, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [location, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  //handle form data post DATA
  const handlePost = async () => {
    try {
      setLoading(true);
      console.log("Title:", title);
      console.log("Description:", description);
      console.log("Location:", location);

      if (!title) {
        alert("Please add post title ");
      }
      if (!description) {
        alert("Please add post description");
      }
      if (!location) {
        alert("Please add post city");
      }

      const { data } = await axios.post(
        "http://192.168.2.115:8080/api/v1/post/create-post",
        {
          title,
          description,
          location,
        }
      );
      setLoading(false);
      setPosts([...post, data?.post]);
      alert(data?.message);
      navigation.navigate("Landing");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="add post title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="add post description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDecription(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="add post city name"
            placeholderTextColor={"gray"}
            multiline={false}
            numberOfLines={1}
            value={location}
            onChangeText={(text) => setCity(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-square" size={18} />
              Create post
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
    margin: 10,
    marginTop: 40,
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
    paddingLeft: 15,
    borderColor: "gray",
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
});
export default Post;
