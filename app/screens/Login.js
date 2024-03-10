import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { firebase } from '../../config';

 const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Signup')
    }

    const handleLogin = async () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (response) => {
                const uid = response.user.uid;
                const usersRef = firebase.firestore().collection('users');
                const userDoc = await usersRef.doc(uid).get();

                if (!userDoc.exists) {
                    Alert.alert("User does not exist anymore.");
                    return;
                }

                const userData = userDoc.data();
                navigation.navigate('Landing', { user: userData }); // Pass userData instead of user
            })
            .catch(error => {
                Alert.alert("Error", error.message);
            });
    }

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
            <Image className="h-80 w-auto absolute" source={require('../assets/background.png')} />
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
            <View className="h-full w-full flex justify-evenly pt-48 mb-72">
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
                            onChangeText={(text) => setPassword(text)}
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
                            onPress={() => handleLogin()}>
                            <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown.delay(600).duration(1000).springify()} 
                        className="flex-row justify-center">

                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={onFooterLinkPress}>
                            <Text className="text-sky-600 font-bold">Signup</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View> 
            </KeyboardAwareScrollView>
        </View>
    );
}

export default Login;