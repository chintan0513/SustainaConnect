import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';


export default function LoginScreen() {
    const navigation = useNavigation();
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
                    className="bg-black/5 p-3 rounded-2xl w-full">

                    <TextInput required
                        placeholder="Enter your Email"
                        placeholderTextColor={'gray'}
                    />
                </Animated.View>
                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()} 
                    className="bg-black/5 p-3 rounded-2xl w-full mb-3">

                    <TextInput required
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                    />
                </Animated.View>

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Login</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">

                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('Signup')}>
                        <Text className="text-sky-600 font-bold">Signup</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    </View>
  )
}
