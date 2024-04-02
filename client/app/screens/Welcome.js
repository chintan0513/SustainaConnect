import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Keyframe } from "react-native-reanimated";

export default function Welcome({ navigation }) {
  const keyframe = new Keyframe({
    0: {
      transform: [{ translateX: -100 }],
    },
    100: {
      transform: [{ translateX: 0 }],
    },
  });
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.WelcomeView}>
        <Image
          source={require("../assets/background.png")}
          style={styles.bgdecoration}
        />
        <View />
        <View>
          <Image
            source={require("../assets/logo.png")}
            style={styles.ImageWelcome}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              className="text-lg"
              style={{ color: "#fff", fontWeight: "700" }}
            >
              Login{" "}
            </Text>
          </Pressable>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text
              className="text-lg"
              style={{ color: "#fff", fontWeight: "700" }}
            >
              Sign Up{" "}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  WelcomeView: {
    height: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    alignSelf: "center",
  },
  ImageWelcome: {
    height: 300,
    padding: 50,
    width: 400,
  },
  bgdecoration: {
    width: "100%",
    position: "absolute",
    top: "-75%",
    left: "0%",
    borderRadius: 999,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
  },
  Button: {
    backgroundColor: "rgb(56 189 248)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
