import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 42.3016, // Windsor's latitude in Canada
          longitude: -83.0302, // Windsor's longitude in Canada
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}
