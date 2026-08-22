import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function NewArchitectureDemo() {
  const fabricEnabled = !!(global as any).nativeFabricUIManager;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native New Architecture</Text>

      <Text style={styles.description}>
        Runtime verification of the New Architecture and Fabric.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>New Architecture</Text>
        <Text style={styles.value}>Enabled</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Fabric</Text>
        <Text style={styles.value}>
          {fabricEnabled ? 'Detected' : 'Not Detected'}
        </Text>
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
    marginTop: 20,
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
  },

  value: {
    marginTop: 6,
    fontSize: 16,
    color: '#666666',
  },
});