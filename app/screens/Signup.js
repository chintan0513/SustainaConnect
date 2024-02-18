import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Pressable, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';


export default function SignupScreen() {

    const navigation = useNavigation();
    
    return (
        <View className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={require('../assets/background.png')} />

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
            <View className="h-full w-full flex justify-around pt-48">
                
                {/* title */}
                <View className="flex items-center">
                    <Animated.Text 
                        entering={FadeInUp.duration(1000).springify()} 
                        style={[
                            { 
                                padding: Platform.OS === 'ios' ? 0 : 40,
                                color: Platform.OS === 'ios' ? 'white' : 'white', // Conditionally set text color based on platform
                                fontSize: Platform.OS === 'ios' ? 36 : 28, // Conditionally set font size based on platform
                                fontWeight: 'bold',
                                letterSpacing: 2
                            }
                        ]}>
                        Sign Up
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-3">
                    <Animated.View 
                        entering={FadeInDown.duration(1000).springify()} 
                        style={[
                            { 
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Default background color
                                padding: Platform.OS === 'ios' ? 20 : 10,
                                 // Conditionally set padding based on platform
                                borderRadius: 10,
                                width: '100%'
                            }
                        ]}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor={'gray'}
                        />
                    </Animated.View>
                    <Animated.View 
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
                        />
                    </Animated.View>
                    <Animated.View 
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
                        />
                    </Animated.View>

                    <Animated.View style={{ width: '100%' }} entering={FadeInDown.delay(600).duration(1000).springify()}>
                        <TouchableOpacity className="w-full bg-sky-400 p-1 rounded-2xl mb-0">
                            <Text className="text-xl font-bold text-white text-center">SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown.delay(800).duration(1000).springify()} 
                        style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={()=> navigation.push('Login')}>
                            <Text className="text-sky-600 font-bold">Login</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </View>
            </View>
        </View>
    )
}
