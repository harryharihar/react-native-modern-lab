import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NativeLabModule from '../../../specs/NativeLabModule';

export default function TurboModuleDemo() {
  const message = NativeLabModule.getMessage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TurboModule Experiment</Text>

      <Text style={styles.description}>
        JavaScript calling a native iOS TurboModule.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Native Response</Text>
        <Text style={styles.value}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  description: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },

  card: {
    marginTop: 24,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
  },

  value: {
    marginTop: 8,
    fontSize: 18,
  },
});
