import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../config';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

const Questions = ({ navigation }) => {
  const [income, setIncome] = useState('');
  const [sin, setSin] = useState('');

  // Function to format SIN number as user types
  const formatSin = (input) => {
    // Remove non-digit characters
    let formatted = input.replace(/\D/g, '');
    // Insert '-' after every 3 digits
    formatted = formatted.replace(/(\d{3})(?=\d)/g, '$1-');
    return formatted;
  };

  const handleSinChange = (text) => {
    setSin(formatSin(text));
  };

  const handleSubmit = () => {
    if (parseInt(income) > 10000) {
      Alert.alert('Alert', 'Your income is too high to access the landing page');
    } else if (!/^\d{3}-\d{3}-\d{3}$/.test(sin)) {
      Alert.alert('Alert', 'Please enter a valid SIN number in the format ###-###-###');
    } else {
      const usersRef = firebase.firestore().collection('SIN');
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        usersRef
          .doc(currentUser.uid)
          .set({
            sin: sin,
            income: parseInt(income)
          })
          .then(() => {
            Alert.alert('Success', 'Your SIN and income have been stored');
            navigation.navigate('Landing', { user: currentUser });
          })
          .catch(error => {
            console.error('Error storing SIN and income: ', error);
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">

        <Image source={require('../assets/background.png')} style={styles.backgroundImage} />

        <View style={styles.logoContainer}>
          <Animated.Image
            source={require('../assets/light.png')}
            style={styles.logoImage}
          />
          <Animated.Image
            source={require('../assets/light.png')}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.formContainer}>
          <Animated.Text style={styles.title}>
            Survey Form
          </Animated.Text>

          <View style={styles.inputContainer}>
            <Animated.View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                onChangeText={text => setIncome(text)}
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
                placeholder="You SIN Number (###-###-###)"
                placeholderTextColor="#777"
              />
            </Animated.View>

            <TouchableOpacity className="w-full bg-sky-400 p-3  rounded-2xl mb-3 text-center items-center" onPress={handleSubmit}>
              <Text style={styles.loginText} className="font-bold">Submit</Text>
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
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  logoImage: {
    height: 225,
    width: 90,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginTop: 40,
    fontWeight: 'bold',
    color: 'rgb(56 189 248)',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  inputView: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: '#1E3A8A',
  },
  inputMargin: {
    marginBottom: 30,
  },
  loginBtn: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Questions;
