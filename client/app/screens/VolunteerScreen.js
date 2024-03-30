import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VolunteerScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !phone || !city) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      const existingUser = registrations.find(
        (user) => user.email === email.toLowerCase()
      );
      if (existingUser) {
        setShowForm(false);
        Alert.alert(
          "User Already Exists",
          "Please see your past registration."
        );
        setLoading(false);
        return;
      }
      const { data } = await axios.post(
        "http://192.168.2.115:8080/api/v1/auth/register",
        {
          name,
          email,
          phone,
          city,
        }
      );
      const registrationData = {
        name,
        email: email.toLowerCase(),
        city,
        phone,
        time: new Date().toLocaleString(),
      };

      await AsyncStorage.setItem("@auth", JSON.stringify(data));

      setRegistrations([...registrations, registrationData]);
      setLoading(false);
      setShowForm(false);
      console.log("Register Data==> ", registrationData);
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
      setLoading(false);
      console.log("Error");
    }
  };

  const handleNewRegistration = () => {
    setShowForm(true);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setCity("");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setCity("");
  };

  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    // console.log("Data==> ", data);
  };
  getLocalStorageData();

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
        {showForm ? (
          <View style={styles.formContainer}>
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
              value={phone}
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
            <TouchableOpacity style={styles.toggleBtn} onPress={toggleForm}>
              <Text style={styles.toggleText}>View Past Registrations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
              <Text style={styles.textBtn}>
                {loading ? "Please Wait..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.pastRegistrationsContainer}>
            <Text style={styles.pageTitle}>Past Registrations</Text>
            {registrations.map((item, index) => (
              <View style={styles.registrationContainer} key={index}>
                <Text style={styles.registrationText}>Name: {item.name}</Text>
                <Text style={styles.registrationText}>Email: {item.email}</Text>
                <Text style={styles.registrationText}>City: {item.city}</Text>
                <Text style={styles.registrationText}>
                  Phone Number: {item.phone}
                </Text>
                <Text style={styles.registrationText}>Time: {item.time}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.toggleBtn} onPress={toggleForm}>
              <Text style={styles.toggleText}>Back to Registration Form</Text>
            </TouchableOpacity>
          </View>
        )}
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
    marginBottom: 5,
    textAlign: "left",
  },
  inputBox: {
    height: 40,
    width: 300,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  formContainer: {
    marginBottom: 30,
  },
  registerBtn: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  textBtn: {
    color: "#fff",
    fontWeight: "bold",
  },
  pastRegistrationsContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  registrationContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  registrationText: {
    marginBottom: 5,
  },
  toggleBtn: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  toggleText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
