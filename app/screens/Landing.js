import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Landing = ({ route }) => {
    const navigation = useNavigation();
    const { user } = route.params;

    const handleLogout = () => {
        navigation.navigate('Welcome'); 
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
