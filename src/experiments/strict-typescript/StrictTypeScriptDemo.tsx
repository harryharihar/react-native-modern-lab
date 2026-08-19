import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {fetchUser} from './api';
import type {User} from './types';

export default function StrictTypeScriptDemo() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser().then(response => {
      if (response.success) {
        setUser(response.data);
      } else {
        setError(response.message);
      }
    });
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.loading}>Loading user...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Strict TypeScript</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>{user.role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },

  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },

  label: {
    marginTop: 12,
    fontSize: 13,
    color: '#6b7280',
  },

  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
  },

  loading: {
    marginTop: 12,
    textAlign: 'center',
  },

  error: {
    color: 'red',
    fontSize: 18,
  },
});
