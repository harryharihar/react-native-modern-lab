# Experiment 04 — useCallback + React.memo

## Objective

Demonstrate how `useCallback` stabilizes a function reference passed to a memoized child component, allowing `React.memo` to skip unnecessary child renders.

---

## Baseline

A memoized child component receives a callback created inline by the parent.

Because the callback is recreated on every parent render, `React.memo` detects a changed function reference and re-renders the child.

---

## Optimized Implementation

The callback is extracted into a `useCallback` hook:

```tsx
const handleChildAction = useCallback(() => {
  console.log('Child action');
}, []);


