import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

let childRenderCount = 0;

type ChildProps = {
  name: string;
  onAction: () => void;
};

const MemoChild = React.memo(function MemoChild({
  name,
  onAction,
}: ChildProps) {
  childRenderCount += 1;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Memo Child</Text>
      <Text>Render count: {childRenderCount}</Text>
      <Text>Received name: {name}</Text>

      <TouchableOpacity style={styles.smallButton} onPress={onAction}>
        <Text style={styles.buttonText}>Child Action</Text>
      </TouchableOpacity>
    </View>
  );
});

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [name] = useState('Harihar');

  const handleChildAction = useCallback(() => {
    console.log('Child action');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>useCallback + React.memo</Text>

        <Text style={styles.description}>
          Optimized experiment: useCallback keeps the function reference stable
          while the parent state changes.
        </Text>

        <View style={styles.counter}>
          <Text style={styles.counterText}>Counter: {count}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(value => value + 1)}>
            <Text style={styles.buttonText}>Increment Counter</Text>
          </TouchableOpacity>
        </View>

        <MemoChild
          name={name}
          onAction={handleChildAction}
        />

        <View style={styles.card}>
          <Text style={styles.title}>What to Observe</Text>

          <Text style={styles.item}>
            • Increment Counter without changing name
          </Text>

          <Text style={styles.item}>
            • MemoChild should not render again
          </Text>

          <Text style={styles.item}>
            • useCallback keeps the callback reference stable
          </Text>

          <Text style={styles.item}>
            • React.memo can now bail out when props are unchanged
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

    smallButton: {
        marginTop: 12,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#e5e7eb',
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
