import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { firebase } from '../../config';

const Questions = ({navigation}) => {
  const [income, setIncome] = useState('');
  const [sin, setSin] = useState('');

  const handleSubmit = () => {
    if (parseInt(income) > 10000){
      Alert.alert('Alert', 'Your income is too high to access the landing page');
    } else if (!/^\d{9}$/.test(sin)) {
      Alert.alert('Alert', 'Please enter a valid SIN number in the format ###-###-###');
    } else {
      const usersRef = firebase.firestore().collection('SIN');
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        usersRef
          .doc(currentUser.uid)
          .set({
            sin: sin
          })
          .then(() => {
            Alert.alert('Success', 'Your SIN has been stored');
            navigation.navigate('Landing', { user: currentUser });
          })
          .catch(error => {
            console.error('Error storing SIN: ', error);
          });
      }
    }
  };

  return (
    <View className="d-flex justify-center text-center mt-40 items-center">
    <Text>Question 1: Write your annual income</Text>
      <TextInput
        onChangeText={text => setIncome(text)}
        value={income}
        keyboardType="numeric"
        placeholder="Annual Income"
      />
      <Text>Question 2: Upload your SIN number</Text>
      <TextInput
        onChangeText={text => setSin(text)}
        value={sin}
        placeholder="SIN Number (###-###-###)"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Questions;
