import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';

const Landing = ({ route }) => {
    const navigation = useNavigation();
    const { user } = route.params;

    // Function to handle logout
    const handleLogout = async () => {

       
        try {
            await firebase.auth().signOut(); 
            console.log('User signed out!');
            navigation.navigate('Welcome'); 
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome {user.displayName || user.email}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Landing;

