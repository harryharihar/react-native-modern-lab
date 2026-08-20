# Experiment 02 — React Rendering Performance

## Status

🔄 In Progress

## Objective

Investigate how React Native components render, identify unnecessary child re-renders, and measure the impact of rendering optimizations using React Native DevTools.

The experiment demonstrates:

- Parent component re-rendering
- Child component re-rendering
- React Native DevTools Profiler
- `React.memo`
- Prop-based memoization
- Stable versus changing props
- Rendering performance measurement

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
