# Experiment 02 — React Rendering Performance

## Status

✅ Completed

## Objective

Investigate how React Native components render, identify unnecessary child re-renders, and measure the impact of rendering optimizations using React Native DevTools and `React.memo`.

This experiment demonstrates:

- Parent component re-rendering
- Child component re-rendering
- React Native DevTools Profiler
- `React.memo`
- Prop-based memoization
- Stable versus changing props
- Measuring rendering behavior
- Applying a practical rendering optimization

---

# Stage 1 — Baseline Rendering

## Objective

Establish a baseline by intentionally allowing child components to re-render when the parent state changes.

## Component Structure

The parent component contains:

- Counter state
- User state
- `UserProfile`
- `ExpensiveChild`

The counter and user name are independent pieces of state.

## Initial Observation

Changing the counter causes `RenderingDemo` to render again.

Because `ExpensiveChild` is a normal function component, it also executes again when its parent renders.

The child does not depend on the counter value, but it still participates in the render.

## Baseline Result

```text
Counter: 0
ExpensiveChild renders: 1

Counter: 1
ExpensiveChild renders: 2

Counter: 2
ExpensiveChild renders: 3

Counter: 3
ExpensiveChild renders: 4
```

## Stage 1 Conclusion

The baseline demonstrated an unnecessary child render.

This provided a measurable baseline before applying an optimization.

---

# Stage 2 — React Native DevTools Profiling

## Objective

Use React Native DevTools Profiler to investigate the rendering behavior.

## Procedure

The application was launched on the iPhone simulator.

React Native DevTools Profiler was used while interacting with the counter and user controls.

## Observation

When the counter was incremented:

```text
Counter state changes
        ↓
RenderingDemo updates
        ↓
React performs a render
        ↓
Child components participate in rendering
        ↓
ExpensiveChild executes again
```

The component tree included:

- `RenderingDemo`
- `UserProfile`
- `ExpensiveChild`
- `TouchableOpacity`
- `View`
- `Text`

## DevTools Result

The Profiler confirmed that changing the counter causes `RenderingDemo` to update.

The baseline implementation also allowed `ExpensiveChild` to participate in the render even though it did not depend on the counter state.

## Stage 2 Conclusion

React Native DevTools provides a practical way to inspect React rendering behavior and identify components involved in updates.

The Profiler established the baseline behavior before optimization.

---

# Stage 3 — React.memo Optimization

## Objective

Prevent `ExpensiveChild` from rendering when its props have not changed.

## Change

The component was changed from a normal function component to a memoized component.

Before:

```tsx
function ExpensiveChild() {
  return (
    <View>
      <Text>Expensive Child</Text>
    </View>
  );
}
```

After:

```tsx
const ExpensiveChild = React.memo(function ExpensiveChild() {
  return (
    <View>
      <Text>Expensive Child</Text>
    </View>
  );
});
```

## Result

After applying `React.memo`, changing only the counter no longer increased the `ExpensiveChild` render count.

Example:

```text
Counter: 0
ExpensiveChild renders: 1

Counter: 1
ExpensiveChild renders: 1

Counter: 2
ExpensiveChild renders: 1

Counter: 3
ExpensiveChild renders: 1
```

## Stage 3 Conclusion

`React.memo` prevented unnecessary renders when the component received the same props.

This demonstrated the basic use of memoization in React Native rendering optimization.

---

# Stage 4 — React.memo with Props

## Objective

Investigate how `React.memo` behaves when the memoized component receives changing props.

The `name` value was passed to `ExpensiveChild`.

```tsx
<ExpensiveChild name={name} />
```

The component receives the value:

```tsx
function ExpensiveChild({name}: {name: string}) {
  // component implementation
}
```

and remains memoized:

```tsx
const ExpensiveChild = React.memo(function ExpensiveChild({
  name,
}: {
  name: string;
}) {
  // component implementation
});
```

## Observation

When only the counter changes:

```text
Counter changes
        ↓
RenderingDemo re-renders
        ↓
name prop remains unchanged
        ↓
React.memo skips ExpensiveChild
```

When the user changes:

```text
User changes
        ↓
name prop changes
        ↓
React.memo detects changed prop
        ↓
ExpensiveChild re-renders
```

When the counter changes again:

```text
Counter changes
        ↓
name prop remains unchanged
        ↓
React.memo skips ExpensiveChild
```

## Actual Result

The simulator confirmed this behavior.

The counter was increased multiple times while the `ExpensiveChild` render count remained unchanged.

After changing the user name, the render count increased.

Further counter changes did not increase the render count again.

Example:

```text
Initial render
→ ExpensiveChild renders: 1

Counter changes
→ ExpensiveChild renders: 1

Counter changes again
→ ExpensiveChild renders: 1

User changes
→ ExpensiveChild renders: 2

Counter changes
→ ExpensiveChild renders: 2
```

## Stage 4 Conclusion

`React.memo` successfully prevented unnecessary renders when the `name` prop remained unchanged.

When the `name` prop changed, the component correctly rendered again.

This demonstrates that `React.memo` compares component props to determine whether a memoized component should render.

---

# Final Architecture

The rendering behavior demonstrated by this experiment can be summarized as:

```text
Parent state changes
        ↓
Parent renders
        ↓
React evaluates child
        ↓
React.memo compares props
        ↓
 ┌───────────────┴───────────────┐
 ↓                               ↓
Props unchanged              Props changed
 ↓                               ↓
Skip child render             Render child
```

---

# Key Learnings

### 1. Parent re-renders can cause child rendering

A normal function component can execute again when its parent renders.

### 2. React.memo can prevent unnecessary renders

`React.memo` allows React to skip rendering a component when its props have not changed.

### 3. Changing props cause a memoized component to render

If a prop changes, `React.memo` does not prevent the render.

### 4. Rendering should be measured

React Native DevTools Profiler can be used to investigate rendering behavior instead of optimizing blindly.

### 5. Memoization is not automatically required everywhere

`React.memo` should be used when it provides a meaningful performance benefit.

---

# Experiment Result

| Stage | Technique | Result |
|---|---|---|
| Stage 1 | No optimization | Child rendered with parent |
| Stage 2 | DevTools Profiler | Rendering behavior measured |
| Stage 3 | `React.memo` | Unchanged props skipped child render |
| Stage 4 | `React.memo` + `name` prop | Changed prop triggered child render |

## Overall Result

✅ Baseline rendering behavior identified.

✅ React Native DevTools Profiler used.

✅ Unnecessary child rendering reproduced.

✅ `React.memo` implemented.

✅ Memoized component behavior with props tested.

✅ Rendering improvement verified on the iPhone simulator.

---

# What We Learned

The most important concept from this experiment is:

```text
Do not optimize based only on assumptions.

First:
Measure the rendering behavior.

Then:
Identify unnecessary renders.

Then:
Apply an optimization.

Finally:
Measure again to verify the improvement.
```

This is the correct performance optimization workflow for React Native applications.

---

# Next Experiment

**Experiment 03 — React Native DevTools**

Topics:

- React Native DevTools
- Component inspection
- React component tree
- Props inspection
- State inspection
- Profiler
- Performance investigation
