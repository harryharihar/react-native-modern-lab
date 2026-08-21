# Experiment 05 — FlatList Performance

## Objective

Investigate React Native FlatList rendering performance and apply practical optimizations for large lists.

## Dataset

The experiment uses **1,000 list items**.

## Optimizations Tested

### 1. React.memo

Each list row is wrapped with `React.memo` to prevent unnecessary row re-renders when props remain unchanged.

### 2. useCallback

The `renderItem` callback is stabilized using `useCallback`, keeping the callback reference stable between parent renders.

### 3. keyExtractor

Each item uses its stable ID through `keyExtractor={item => item.id}`.

### 4. getItemLayout

Fixed-height rows use `getItemLayout` so FlatList can calculate item positions without measuring each row.

### 5. initialNumToRender

`initialNumToRender={5}` limits the initial number of rows rendered.

### 6. windowSize

`windowSize={5}` keeps the rendering window relatively small.

### 7. maxToRenderPerBatch

`maxToRenderPerBatch={5}` controls the number of rows rendered in each batch.

### 8. updateCellsBatchingPeriod

`updateCellsBatchingPeriod={50}` controls the interval between cell rendering batches.

## Result

The optimized FlatList successfully rendered the 1,000-item dataset. Parent state updates did not cause unnecessary re-renders of memoized rows when row props remained unchanged.

Scrolling remained stable with no visual breaking, overlapping rows, blank areas, or incorrect item positioning observed during testing.

## Key Learning

FlatList performance is improved by combining memoization, stable callbacks, stable item keys, fixed item layout, and controlled rendering batches.

**Experiment 05: Completed**
