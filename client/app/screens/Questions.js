import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../config";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";

const Questions = ({ navigation }) => {
  const [income, setIncome] = useState("");
  const [sin, setSin] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  useEffect(() => {
    if (image) {
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
    }
  }, [image]);

  const formatSin = (input) => {
    let formatted = input.replace(/\D/g, "");
    formatted = formatted.replace(/(\d{3})(?=\d)/g, "$1-");
    return formatted;
  };

  const handleSinChange = (text) => {
    setSin(formatSin(text));
  };

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.assets[0].uri };

    if (!result.cancelled) {
      setImage(source);
    }
  };

  const handleSubmit = async () => {
    if (parseInt(income) > 10000) {
      Alert.alert(
        "Alert",
        "Your income is too high to access the landing page"
      );
    } else if (!/^\d{3}-\d{3}-\d{3}$/.test(sin)) {
      Alert.alert(
        "Alert",
        "Please enter a valid SIN number in the format ###-###-###"
      );
    } else {
      try {
        const usersRef = firebase.firestore().collection("SIN");
        const currentUser = firebase.auth().currentUser;

        if (currentUser) {
          if (image) {
            setUploading(true);
            const response = await fetch(image.uri);
            const blob = response.blob();
            const filename = image.uri.substring(
              image.uri.lastIndexOf("/") + 1
            );
            var ref = firebase.storage().ref().child(filename).put(blob);
            try {
              await ref;
            } catch (e) {
              console.log(e);
            }
            setUploading(false);
            Alert.alert("Photo uploaded!");
            setImage(null);
          }

          await usersRef.doc(currentUser.uid).set({
            sin: sin,
            income: parseInt(income),
            photo: image,
          });

          const serializableCurrentUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
          };

          Alert.alert(
            "Success",
            "Your SIN, income, and photo have been stored"
          );
          navigation.navigate("Landing", { user: serializableCurrentUser });
        }
      } catch (error) {
        console.error("Error storing SIN, income, and photo: ", error);
        Alert.alert(
          "Error",
          "Failed to store SIN, income, and photo. Please try again later."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          source={require("../assets/background.png")}
          style={styles.backgroundImage}
        />

        <View style={styles.logoContainer}>
          <Animated.Image
            source={require("../assets/light.png")}
            style={styles.logoImage}
          />
          <Animated.Image
            source={require("../assets/light.png")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.formContainer}>
          <Animated.Text style={styles.title}>Survey Form</Animated.Text>

          <View style={styles.inputContainer}>
            <Animated.View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => setIncome(text)}
                value={income}
                keyboardType="numeric"
                placeholder="Your Annual Income"
                placeholderTextColor="#777"
              />
            </Animated.View>

            <Animated.View style={[styles.inputView, styles.inputMargin]}>
              <TextInput
                style={styles.inputText}
                onChangeText={handleSinChange}
                value={sin}
                keyboardType="numeric"
                placeholder="Your SIN Number (###-###-###)"
                placeholderTextColor="#777"
              />
            </Animated.View>

            <TouchableOpacity
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
              style={styles.selectButton}
              onPress={pickImage}
            >
              <Text
                className="text-xl font-bold text-white text-center"
                style={styles.btnText}
              >
                Pick an Image
              </Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {image && (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 50, height: 50 }}
                />
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !isImageSelected && { backgroundColor: "#ccc" },
              ]}
              onPress={handleSubmit}
            >
              <Text style={[styles.submitText]} disabled={!isImageSelected}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    height: "50%",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  logoImage: {
    height: 225,
    width: 90,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginTop: 40,
    fontWeight: "bold",
    color: "rgb(56 189 248)",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
  },
  inputView: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: "#1E3A8A",
  },
  inputMargin: {
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  uploadText: {
    color: "white",
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: "rgb(56 189 248)",
    marginTop: 15,
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "auto",
    display: "block",
  },
  submitText: {
    color: "white",
    fontSize: 20,
  },
});

export default Questions;
