import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";

const VolunteerScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState("false");
  const [city, setCity] = useState("");

  const handleSubmit = () => {
    try {
      setLoading(true);
      if (!name || !email || !phoneNumber || !city) {
        Alert.alert("Please fill all fields");
        setLoading(false);
      }
      console.log("Register Data==> ", { email, name, phoneNumber, city });
      setLoading(false);
    } catch {
      console.log("Error");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/blue-fluid-background-frame_53876-99019.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711497600&semt=ais",
      }}
      style={styles.image}
    >
      <View style={styles.overlay}></View>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Volunteer Registration</Text>
        <View style={{ marginVertical: 30 }}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Type your Name here..."
            style={styles.inputBox}
            autoCorrect={false}
            keyboardType="Name"
            autoCompleteType="name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Type your Email here..."
            style={styles.inputBox}
            autoCorrect={false}
            keyboardType="email-address"
            autoCompleteType="email"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Type your Phone Number here..."
            style={styles.inputBox}
            autoCorrect={false}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <Text style={styles.label}>City</Text>
          <TextInput
            placeholder="Type your City here..."
            style={styles.inputBox}
            autoCorrect={false}
            keyboardType="Name"
            autoCompleteType="name"
            value={city}
            onChangeText={setCity}
          />
        </View>
        {/* <Text>{JSON.stringify({name,email}, null, 4)}</Text> */}
        <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
          <Text style={styles.textBtn}>
            {loading ? "Please Wait..." : "Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default VolunteerScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#2596be",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    textAlign: "left",
  },
  inputBox: {
    height: 40,
    width: 300,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingLeft: 10,
  },
  registerBtn: {
    backgroundColor: "#000",
    display: "flex",
    padding: 10,
    height: 40,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textBtn: {
    color: "#fff",
    fontWeight: "bold",
  },
});
