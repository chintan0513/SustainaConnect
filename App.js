import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';

import Login from './app/screens/Login';
import Signup from './app/screens/Signup';
import Welcome from './app/screens/Welcome';
import Header from './app/screens/Header';
import Landing from './app/screens/Landing';
import {firebase} from './config';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  if(!user){

    return (
      <NavigationContainer>
              <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerTitle: () => <Header />,
                 headerStyle: {
                  height: 150, 
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
                }} />
                {/* <Stack.Screen name="Signup" component={Signup} /> */}
                <Stack.Screen name="Signup" component={Signup} options={{ headerTitle: () => <Signup />,
                 headerStyle: {
                  height: 150, 
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
                }} />
                <Stack.Screen name="Login" component={Login} options={{ headerTitle: () => <Login />,
                 headerStyle: {
                  height: 150, 
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#00e4d0',
                  shadowColor: '#000',
                  elevation: 25
                }
                }} />
              </Stack.Navigator>
            </NavigationContainer>

    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={Landing} options={{ headerTitle: () => <Landing />,
           headerStyle: {
            height: 150, 
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: '#00e4d0',
            shadowColor: '#000',
            elevation: 25
          }
          }} />
    </Stack.Navigator>
  )
}

  

  




export default App;
