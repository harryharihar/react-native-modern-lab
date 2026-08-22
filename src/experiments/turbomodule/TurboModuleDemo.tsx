import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NativeLabModule from '../../../specs/NativeLabModule';

export default function TurboModuleDemo() {
  const message = NativeLabModule.getMessage();

  const jsi = (global as any).__RNModernLabJSI;

  let jsiResult = 'Not installed';

  if (jsi && typeof jsi.multiply === 'function') {
    jsiResult = String(jsi.multiply(6, 7));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Experiment 10 — Direct JSI</Text>

      <View style={styles.card}>
        <Text style={styles.label}>TurboModule</Text>
        <Text style={styles.value}>{message}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Direct JSI</Text>
        <Text style={styles.value}>
          {jsiResult === '42'
            ? '6 × 7 = 42 ✓'
            : `Result: ${jsiResult}`}
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
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
  },

  card: {
    padding: 20,
    marginBottom: 16,
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
