import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../config';

export default function Signup({navigation}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const handleSignup = () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
    
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    username,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Login', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    }

    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
            
            <Image className="h-80 w-full absolute" source={require('../assets/background.png')} />

            {/* lights */}
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image 
                    entering={FadeInUp.delay(200).duration(1000).springify()} 
                    source={require('../assets/light.png')} 
                    className="h-[225] w-[90]"
                />
                <Animated.Image 
                    entering={FadeInUp.delay(400).duration(1000).springify()} 
                    source={require('../assets/light.png')} 
                    className="h-[160] w-[65]" 
                />
            </View>

            {/* title and form */}
            <View className="h-full w-full flex justify-around pt-48 mb-72">
                
                {/* title */}
                <View className="flex items-center">
                    <Animated.Text 
                        entering={FadeInUp.duration(1000).springify()} 
                        className="text-sky-500 font-bold tracking-wider text-4xl">
                        SignUp
                    </Animated.Text>
                    
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-4">
                    <Animated.View 
                        entering={FadeInDown.duration(1000).springify()} 
                        className="bg-black/5 p-4 rounded-2xl w-full"
                        style={[
                            { 
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // 
                                padding: Platform.OS === 'ios' ? 20 : 10,
                                borderRadius: 10,
                                width: '100%'
                            }
                        ]}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor={'gray'}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </Animated.View>
                    <Animated.View 
                        className="bg-black/5 p-4 rounded-2xl w-full mb-0"
                        entering={FadeInDown.delay(200).duration(1000).springify()} 
                        style={[
                            { 
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Default background color
                                padding: Platform.OS === 'ios' ? 20 : 10, // Conditionally set padding based on platform
                                borderRadius: 10,
                                width: '100%'
                            }
                        ]}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'gray'}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </Animated.View>
                    <Animated.View 
                        className="bg-black/5 p-4 rounded-2xl w-full mb-3"
                        entering={FadeInDown.delay(400).duration(1000).springify()} 
                        style={[
                            { 
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Default background color
                                padding: Platform.OS === 'ios' ? 20 : 10, // Conditionally set padding based on platform
                                borderRadius: 10,
                                width: '100%',
                                marginBottom: 0 // Adjust margin bottom for Android
                            }
                        ]}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'gray'}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Animated.View>
                    <Animated.View 
                        className="bg-black/5 p-4 rounded-2xl w-full mb-3"
                        entering={FadeInDown.delay(400).duration(1000).springify()} 
                        style={[
                            { 
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Default background color
                                padding: Platform.OS === 'ios' ? 20 : 10, // Conditionally set padding based on platform
                                borderRadius: 10,
                                width: '100%',
                                marginBottom: 0 // Adjust margin bottom for Android
                            }
                        ]}>
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor={'gray'}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </Animated.View>

                    <Animated.View style={{ width: '100%' }} entering={FadeInDown.delay(600).duration(1000).springify()}>
                        <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-0" onPress={handleSignup}>
                            <Text className="text-xl font-bold text-white text-center">SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown.delay(800).duration(1000).springify()} 
                        style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={onFooterLinkPress}>
                            <Text className="text-sky-600 font-bold">Login</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </View>
            </View>
            </KeyboardAwareScrollView>
        </View>
    )
}