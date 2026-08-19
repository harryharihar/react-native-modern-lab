import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const experiments = [
  'Strict TypeScript API',
  'Rendering & React DevTools',
  'FlatList Performance',
  'Android Edge-to-Edge',
  'Metro Bundler',
  'New Architecture',
  'TurboModules',
  'JSI',
  'Mobile AI',
];

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>React Native Modern Lab</Text>

        <Text style={styles.subtitle}>
          Hands-on React Native R&D
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.label}>React Native</Text>
          <Text style={styles.value}>0.86.2</Text>
        </View>

        <Text style={styles.sectionTitle}>Experiments</Text>

        {experiments.map((experiment, index) => (
          <View key={experiment} style={styles.experimentCard}>
            <Text style={styles.number}>{index + 1}</Text>

            <Text style={styles.experiment}>
              {experiment}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 16,
    color: '#6B7280',
  },

  infoCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    color: '#6B7280',
  },

  value: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  sectionTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  experimentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  number: {
    width: 30,
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },

  experiment: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
});
