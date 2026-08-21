import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function EdgeToEdgeContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          {
            paddingTop: 24 + insets.top,
            paddingBottom: 24 + insets.bottom,
          },
        ]}>
        <Text style={styles.title}>Android Edge-to-Edge Lab</Text>

        <Text style={styles.description}>
          Baseline experiment for Android system bars and window insets.
        </Text>

        <Text style={styles.status}>
          Top inset: {insets.top}
        </Text>

        <Text style={styles.status}>
          Bottom inset: {insets.bottom}
        </Text>

        <Text style={styles.status}>
          Left inset: {insets.left}
        </Text>

        <Text style={styles.status}>
          Right inset: {insets.right}
        </Text>
      </View>
    </View>
  );
}

export default function EdgeToEdgeDemo() {
  return (
    <SafeAreaProvider>
      <EdgeToEdgeContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  description: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
    lineHeight: 23,
  },

  status: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
  },
});