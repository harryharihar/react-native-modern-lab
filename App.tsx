import React from 'react';
import EdgeToEdgeDemo from './src/experiments/edge-to-edge/EdgeToEdgeDemo';
import metroTest from './src/experiments/metro/test-module.cjs';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>{metroTest.message}</Text>
    </View>
  );
}
