import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import NativeLabView from '../../../specs/NativeLabViewNativeComponent';

export default function FabricDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Experiment 13 — Fabric</Text>

      <Text style={styles.description}>
        This component is rendered using React Native's Fabric architecture.
      </Text>

      <NativeLabView
        title="Hello from Fabric"
        style={styles.nativeView}
      />

      <Text style={styles.flow}>
        React → Codegen → ShadowNode → ComponentDescriptor → Native UIView
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },

  description: {
    fontSize: 18,
    marginBottom: 30,
  },

  nativeView: {
    height: 180,
    width: '100%',
  },

  flow: {
    fontSize: 18,
    marginTop: 30,
  },
});
