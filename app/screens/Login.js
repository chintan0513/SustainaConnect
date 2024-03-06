import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import {firebase} from '../../config';

 const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleLogin = async (email, password) => {
    console.log("Logging in with:", email, password); // Check if function is being called
    try {
        // Temporarily replace Firebase login with a console log
        console.log("Simulating login with Firebase...");
        navigation.navigate('Welcome'); // Verify if navigation is working
    } catch (error) {
        Alert.alert('Error', error.message);
    }
}


    /*const handleLogin = async(email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Welcome');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }*/

    // const handleLogin = () => {
    //     if (!email || !password) {
    //         Alert.alert('Error', 'Please fill in all fields');
    //         return;
    //     }
    //     // Implement login logic here
    // };

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-80 w-auto absolute" source={require('../assets/background.png')} />

            {/* lights */}
            <View className="flex-row justify-around w-full absolute ">
                <Animated.Image 
                    entering={FadeInUp.delay(200).duration(1000).springify()} 
                    source={require('../assets/light.png')} 
                    className="h-[225] w-[90]" 
                />
                <Animated.Image 
                    entering={FadeInUp.delay(400).duration(1000).springify()} 
                    source={require('../assets/light.png')} 
                    className="h-[160] w-[65] " 
                />
            </View>
            <View className="h-full w-full flex justify-evenly pt-40">
                <View className="flex items-center">
                    <Animated.Text 
                        entering={FadeInUp.duration(1000).springify()} 
                        className="text-sky-500 font-bold tracking-wider text-4xl">
                            Login
                    </Animated.Text>
                </View>
                <View className="flex items-center mx-5 space-y-4">
                    <Animated.View 
                        entering={FadeInDown.duration(1000).springify()} 
                        className="bg-black/5 p-4 rounded-2xl w-full">

                        <TextInput 
                            required 
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            placeholder="Enter your Email"
                            placeholderTextColor={'gray'}
                        />
                    </Animated.View>
                    <Animated.View 
                        entering={FadeInDown.delay(200).duration(1000).springify()} 
                        className="bg-black/5 p-4 rounded-2xl w-full mb-3">

                        <TextInput 
                            required
                            placeholder="Password" 
                            onChangeText={(password) => setPassword(password)}
                            value={password}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholderTextColor={'gray'}
                            secureTextEntry
                        />
                    </Animated.View>

                    <Animated.View 
                        className="w-full" 
                        entering={FadeInDown.delay(400).duration(1000).springify()}>

                        <TouchableOpacity 
                            className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
                            onPress={handleLogin}>
                            <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown.delay(600).duration(1000).springify()} 
                        className="flex-row justify-center">

                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('Signup')}>
                            <Text className="text-sky-600 font-bold">Signup</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
}

export default Login;