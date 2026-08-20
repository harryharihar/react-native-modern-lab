# Experiment 03 — React Native DevTools

## Status

🔄 In Progress

## Objective

Explore React Native DevTools and understand how to inspect React Native components, props, state, console output, and rendering behavior.

---

# Stage 1 — Launch React Native DevTools

## Objective

Verify that React Native DevTools can connect to the running application.

## Procedure

1. Launch the React Native application.
2. Open React Native DevTools.
3. Confirm that the application is connected.
4. Verify that the DevTools panels are available.

## Result

React Native DevTools successfully connected to the application.

The following panels were available:

- Console
- Sources
- Network
- Performance
- Memory
- Components
- Profiler

## Observation

The React Native application was successfully connected to DevTools.

**Stage 1: Completed**

---

# Stage 2 — Component Inspection

## Objective

Inspect the React component hierarchy.

## Procedure

1. Open the Components panel.
2. Locate `RenderingDemo`.
3. Expand the component tree.
4. Inspect the child components.

## Result

`RenderingDemo` was successfully located in the component tree.

The application contained components including:

```text
App
└── RenderingDemo
    ├── ScrollView
    ├── Text
    ├── TouchableOpacity
    ├── UserProfile
    └── ExpensiveChild
```