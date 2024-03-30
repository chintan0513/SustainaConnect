import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./app/screens/Login";
import Signup from "./app/screens/Signup";
import Welcome from "./app/screens/Welcome";
import Questions from "./app/screens/Questions";
import { firebase } from "./config";
import { decode, encode } from "base-64";
import Landing from "./app/screens/Landing";
import VolunteerScreen from "./app/screens/VolunteerScreen";
import { AuthProvider } from "./context/authContext";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setInitializing(false);
          });
      } else {
        setInitializing(false);
      }
    });
  }, []);

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Questions" component={Questions} />
          <Stack.Screen name="Landing" component={Landing} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            screenOptions={{ headerShown: false }}
            // initialRouteName="Landing"
            component={Landing}
            options={{
              headerTitle: () => <Landing />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: "#00e4d0",
                shadowColor: "#000",
                elevation: 25,
              },
            }}
          />
          <AuthProvider>
            <Stack.Screen name="volunteer" component={VolunteerScreen} />
          </AuthProvider>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
