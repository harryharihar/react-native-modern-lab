import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

interface NativeLabModuleSpec {
  startBackgroundComputation(): Promise<number>;
}

const NativeLabModule =
  TurboModuleRegistry.getEnforcing<NativeLabModuleSpec>(
    'NativeLabModule',
  );

export default function BackgroundNativeDemo() {
  const [duration, setDuration] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(value => value + 1);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const runBackgroundWork = async () => {
    setError(null);
    setResult(null);
    setDuration(null);
    setRunning(true);

    const start = performance.now();

    try {
      const nativeResult =
        await NativeLabModule.startBackgroundComputation();

      const elapsed = performance.now() - start;

      setResult(nativeResult);
      setDuration(elapsed);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : 'Background computation failed';

      setError(message);
    } finally {
      setRunning(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Experiment 12 — Background Native Work
      </Text>

      <Text style={styles.description}>
        CPU-heavy native work running on a background thread
        without synchronously blocking the JavaScript call.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Background Computation
        </Text>

        <Text style={styles.value}>
          {duration === null
            ? 'Not measured'
            : `${duration.toFixed(2)} ms`}
        </Text>

        {result !== null && (
          <Text style={styles.result}>
            Result: {result.toFixed(2)}
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          JS Responsiveness Counter
        </Text>

        <Text style={styles.counter}>
          {counter}
        </Text>

        <Text style={styles.smallText}>
          This counter continues while native work runs.
        </Text>
      </View>

      {error !== null && (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Error
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

      <Pressable
        style={[
          styles.button,
          running && styles.disabled,
        ]}
        onPress={runBackgroundWork}
        disabled={running}>
        <Text style={styles.buttonText}>
          {running
            ? 'Running Native Work...'
            : 'Run Background Native Work'}
        </Text>
      </Pressable>

      <Text style={styles.note}>
        Native computation runs on a background queue and
        returns the result through a Promise.
      </Text>
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
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
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

  result: {
    marginTop: 8,
    fontSize: 13,
    color: '#666666',
  },

  counter: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '700',
  },

  smallText: {
    marginTop: 6,
    fontSize: 13,
    color: '#666666',
  },

  errorCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
  },

  errorTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },

  errorText: {
    fontSize: 13,
    lineHeight: 19,
  },

  button: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#111827',
    alignItems: 'center',
    marginBottom: 12,
  },

  disabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  note: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: '#777777',
    textAlign: 'center',
  },
});
