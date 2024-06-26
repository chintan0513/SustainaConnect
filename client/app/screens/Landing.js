import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MapScreen from "./MapScreen";
import VolunteerScreen from "./VolunteerScreen";
import ProfileScreen from "./ProfileScreen";
import HomeScreen from "./HomeScreen";
import Post from "./Post";

const Tab = createMaterialBottomTabNavigator();

export default function Landing({ navigation, route }) {
  const { user } = route.params;

  return (
    <Tab.Navigator
      style={styles.container}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Landing") {
            iconName = focused ? "home-outline" : "home-outline";
          } else if (route.name === "Volunteer") {
            iconName = focused ? "megaphone-outline" : "megaphone-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map-outline" : "map-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "man-outline" : "man-outline";
          } else if (route.name === "post") {
            iconName = focused ? "add-circle-outline" : "add-circle-outline";
          }
          return <Ionicons name={iconName} size={25} />;
        },
        tabBarLabel: "",
        tabBarShowLabel: false,
        tabBarColor: "black",
      })}
      // tabBarOptions={{
      //   activeTintColor: 'cyan',
      //   inactiveTintColor: 'gray',
      // }}
    >
      <Tab.Screen style={styles.icons} name="Landing" component={HomeScreen} />
      <Tab.Screen name="post" component={Post} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Volunteer" component={VolunteerScreen} />
      <Tab.Screen
        name="Profile"
        initialParams={{ user: user }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icons: {
    color: "black",
  },
});
