import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

let renderCount = 0;

function ExpensiveChild() {
  renderCount += 1;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Expensive Child</Text>
      <Text>Render count: {renderCount}</Text>
    </View>
  );
}

function UserProfile({name}: {name: string}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>User Profile</Text>
      <Text>{name}</Text>
    </View>
  );
}

export default function RenderingDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Harihar');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Rendering Performance Lab</Text>

        <Text style={styles.description}>
          Baseline experiment: intentionally allowing child components to
          re-render when the parent state changes.
        </Text>

        <View style={styles.counter}>
          <Text style={styles.counterText}>Counter: {count}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(value => value + 1)}>
            <Text style={styles.buttonText}>Increment Counter</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            setName(value => (value === 'Harihar' ? 'React Native' : 'Harihar'))
          }>
          <Text style={styles.secondaryButtonText}>Change User</Text>
        </TouchableOpacity>

        <UserProfile name={name} />

        <ExpensiveChild />

        <View style={styles.card}>
          <Text style={styles.title}>What to Observe</Text>

          <Text style={styles.item}>
            • Increment Counter without changing User Profile
          </Text>

          <Text style={styles.item}>
            • Observe whether child components render again
          </Text>

          <Text style={styles.item}>
            • We will optimize this in the next stage
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
  },

  description: {
    marginTop: 12,
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },

  counter: {
    marginTop: 24,
  },

  counterText: {
    fontSize: 22,
    fontWeight: '600',
  },

  button: {
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#111827',
  },

  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },

  secondaryButton: {
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#111827',
  },

  secondaryButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },

  card: {
    marginTop: 20,
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  item: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
  },
});

