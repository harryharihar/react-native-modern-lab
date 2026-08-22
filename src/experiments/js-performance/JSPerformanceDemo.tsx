import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TurboModuleRegistry,
} from 'react-native';

interface NativeLabModuleSpec {
  getMessage(): string;
}

const NativeLabModule =
  TurboModuleRegistry.getEnforcing<NativeLabModuleSpec>(
    'NativeLabModule',
  );

function heavyJavaScriptWork(): number {
  let result = 0;

  for (let i = 0; i < 50_000_000; i++) {
    result += Math.sqrt(i);
  }

  return result;
}

export default function JSPerformanceDemo() {
  const [jsDuration, setJsDuration] = useState<number | null>(null);
  const [nativeDuration, setNativeDuration] = useState<number | null>(null);
  const [nativeResult, setNativeResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const runJavaScriptWork = () => {
    setError(null);
    setRunning(true);

    requestAnimationFrame(() => {
      const start = performance.now();

      heavyJavaScriptWork();

      const elapsed = performance.now() - start;

      setJsDuration(elapsed);
      setRunning(false);
    });
  };

  const runNativeJSIWork = () => {
    setError(null);
    setRunning(true);

    requestAnimationFrame(() => {
      try {
        const jsi = (global as any).__RNModernLabJSI;

        if (!jsi) {
          throw new Error(
            '__RNModernLabJSI is not installed. NativeLabModule was not initialized.',
          );
        }

        if (typeof jsi.heavyComputation !== 'function') {
          throw new Error(
            'heavyComputation() is not available on __RNModernLabJSI.',
          );
        }

        const start = performance.now();

        const result = jsi.heavyComputation();

        const elapsed = performance.now() - start;

        setNativeResult(result);
        setNativeDuration(elapsed);
      } catch (e) {
        const message =
          e instanceof Error ? e.message : 'Unknown native JSI error';

        setError(message);
      } finally {
        setRunning(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Experiment 11 — JS Performance
      </Text>

      <Text style={styles.description}>
        Comparing CPU-heavy JavaScript execution with a native JSI
        Host Function.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>JavaScript Thread</Text>

        <Text style={styles.value}>
          {jsDuration === null
            ? 'Not measured'
            : `${jsDuration.toFixed(2)} ms`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Native JSI</Text>

        <Text style={styles.value}>
          {nativeDuration === null
            ? 'Not measured'
            : `${nativeDuration.toFixed(2)} ms`}
        </Text>

        {nativeResult !== null && (
          <Text style={styles.result}>
            Result: {nativeResult.toFixed(2)}
          </Text>
        )}
      </View>

      {error !== null && (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>JSI Error</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Pressable
        style={[styles.button, running && styles.disabled]}
        onPress={runJavaScriptWork}
        disabled={running}>
        <Text style={styles.buttonText}>
          {running ? 'Running...' : 'Run JavaScript Work'}
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          styles.secondaryButton,
          running && styles.disabled,
        ]}
        onPress={runNativeJSIWork}
        disabled={running}>
        <Text style={styles.buttonText}>
          {running ? 'Running...' : 'Run Native JSI Work'}
        </Text>
      </Pressable>

      <Text style={styles.note}>
        Synchronous JSI does not automatically move work to a
        background thread.
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

  secondaryButton: {
    backgroundColor: '#374151',
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