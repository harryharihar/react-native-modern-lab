import React, { useCallback, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Item = {
  id: string;
  title: string;
};

const DATA: Item[] = Array.from({ length: 1000 }, (_, index) => ({
  id: String(index),
  title: `Item ${index + 1}`,
}));

let rowRenderCount = 0;

const Row = React.memo(function Row({ item }: { item: Item }) {
  rowRenderCount += 1;

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.renderCount}>
        Total row renders: {rowRenderCount}
      </Text>
    </View>
  );
});


export default function FlatListDemo() {
  const [count, setCount] = useState(0);

  const renderItem = useCallback(
    ({ item }: { item: Item }) => <Row item={item} />,
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>FlatList Performance Lab</Text>

        <Text style={styles.description}>
          Optimized experiment: memoized rows with a stable renderItem callback.
        </Text>

        <Text style={styles.counter}>Counter: {count}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(value => value + 1)}>
          <Text style={styles.buttonText}>Update Parent</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        getItemLayout={(_, index) => ({
          length: 110,
          offset: 110 * index,
          index,
        })}
        initialNumToRender={5}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    padding: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    color: '#666666',
    lineHeight: 21,
  },

  counter: {
    marginTop: 16,
    fontSize: 20,
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

  row: {
    height: 100,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  renderCount: {
    marginTop: 5,
    fontSize: 12,
    color: '#666666',
  },
});
