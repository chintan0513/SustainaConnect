import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

const VolunteerScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("false");

  const handleSubmit = () => {
    try {
      setLoading(true);
      if (!name || !email) {
        Alert.alert("Please fill all fields");
        setLoading(false);
      }
      console.log("Register Data==> ", { email, name });
      setLoading(false);
    } catch {
      console.log("Error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Volunteer Registration</Text>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ color: "#fff" }}>Name</Text>
        <TextInput
          style={styles.inputBox}
          autoCorrect={false}
          keyboardType="Name"
          autoCompleteType="name"
          value={name}
          onChangeText={setName}
        />
        <Text style={{ color: "#fff" }}>Email</Text>
        <TextInput
          style={styles.inputBox}
          autoCorrect={false}
          keyboardType="email-address"
          autoCompleteType="email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {/* <Text>{JSON.stringify({name,email}, null, 4)}</Text> */}
      <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
        <Text style={styles.textBtn}>
          {loading ? "Please Wait..." : "Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VolunteerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2596be",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
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
