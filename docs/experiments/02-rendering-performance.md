# Experiment 02 — React Rendering Performance

## Status

🔄 In Progress

## Objective

Investigate unnecessary React component re-renders in a React Native application.

## Baseline

The initial implementation intentionally does not use rendering optimizations.

The parent component contains:

- Counter state
- User state
- UserProfile component
- ExpensiveChild component

## Initial Observation

Changing the counter causes the parent component to render again.

Because React function components execute again when their parent renders, `ExpensiveChild` also executes again even though it does not depend on the counter state.

## Baseline Result

Example:

```text
Counter: 0
ExpensiveChild renders: 1

Counter: 1
ExpensiveChild renders: 2

Counter: 2
ExpensiveChild renders: 3

Counter: 3
ExpensiveChild renders: 4


## Stage 1 — React Native DevTools Profiling

We used React Native DevTools Profiler to investigate the baseline rendering behavior.

### Observation

When the counter is incremented:

Counter state changes
        ↓
RenderingDemo renders
        ↓
Child components participate in rendering
        ↓
ExpensiveChild renders again

The Profiler showed `RenderingDemo` as the component responsible for the update.

The component tree included:

- RenderingDemo
- UserProfile
- ExpensiveChild
- TouchableOpacity
- View
- Text

### DevTools Result

The Profiler confirmed that changing the counter causes the `RenderingDemo` component to update.

`ExpensiveChild` also participates in the render even though it does not depend on the counter state.

### Stage 1 Conclusion

The baseline implementation demonstrates an unnecessary child render.

This gives us a measurable baseline before applying any optimization.

Next we will test `React.memo` to prevent unnecessary rendering when the component props have not changed.


## Stage 2 — React.memo Optimization

The baseline implementation was modified to use `React.memo` for `ExpensiveChild`.

### Change

Before:

```tsx
function ExpensiveChild() {
  // component implementation
}
const ExpensiveChild = React.memo(function ExpensiveChild() {
  // component implementation
});

Counter: 0 → ExpensiveChild renders: 1
Counter: 1 → ExpensiveChild renders: 1
Counter: 2 → ExpensiveChild renders: 1
Counter: 3 → ExpensiveChild renders: 1
