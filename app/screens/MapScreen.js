import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825, // Initial latitude (example)
          longitude: -122.4324, // Initial longitude (example)
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}
