import {
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';
  import { BlurView } from 'expo-blur';
  import {Keyframe} from 'react-native-reanimated';
  
  export default function Welcome({navigation}){
    const keyframe = new Keyframe({
      0: {
        transform: [{translateX: -100}],
      },
      100: {
        transform: [{translateX: 0}],
      },
    });
    return (
      <SafeAreaView>
        <StatusBar translucent backgroundColor="transparent" />
  
        <View style={styles.WelcomeView}>
        <BlurView intensity={50} tint="light" style={styles.bgdecoration}
      />
          <View />
          <View>
            <Text
              style={[
                styles.title,
                {
                  fontSize: 34,
                },
              ]}>
              SUSTAINACONNECT
            </Text>
            <Text style={styles.title}>A Social food events app</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: "#fff", fontWeight: "700"}}> Login </Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={{color: "#fff", fontWeight: "700"}}>Sign Up </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    WelcomeView: {
      height: '100%',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 22,
      alignSelf: 'center',
    },
    ImageWelcome: {
      height: 250,
      width: 250,
    },
    bgdecoration: {
      height: '90%',
      width: '200%',
      backgroundColor: '#749',
      position: 'absolute',
      top: '-8%',
      left: '-60%',
      borderRadius: 999,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'space-around',
    },
    Button: {
      backgroundColor: 'rgb(56 189 248)',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
    }
  });