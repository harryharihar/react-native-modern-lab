# Experiment 03 — React Native DevTools

## Status

✅ Completed

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
---

# Stage 3 — Props Inspection

## Objective

Inspect component props and verify how data is passed from the parent component to the child component.

## Procedure

1. Open the Components panel in React Native DevTools.
2. Select `ExpensiveChild`.
3. Inspect the `props` section in the right-side inspector.
4. Observe the value of the `name` prop.

## Result

The `ExpensiveChild` component was successfully inspected.

The DevTools props inspector showed:

```text
name: "Harihar"
```

## Observation

After pressing **Change User**, the `name` prop changed from `"Harihar"` to `"React Native"`.

The `ExpensiveChild` render count increased from `1` to `2`.

This confirms that when the parent state changes, the updated value is passed to the child through props and the child renders again.


---

# Stage 4 — State Inspection

## Objective

Inspect React hook state using React Native DevTools and verify that state values can be observed directly on the selected component.

## Procedure

1. Open the **Components** panel.
2. Select `RenderingDemo`.
3. Inspect the **hooks** section in the right-side inspector.
4. Observe the state values maintained by the component.
5. Trigger state changes from the application and verify the updated values.

## Result

The `RenderingDemo` component was successfully inspected in React Native DevTools.

The hooks inspector showed:

```text
State: 2
State: "React Native"
```

The application displayed `Counter: 2` and the user value `React Native`, matching the state values shown by DevTools.

## Observation

React Native DevTools exposes React hook state for the selected component. This makes it possible to inspect the current state directly and correlate state changes in the application with the component state maintained by React.

**Stage 4: Completed**

---

# Stage 5 — Profiler

## Objective

Use React Native DevTools Profiler to record component rendering and identify components that rendered during updates.

## Procedure

1. Open the **Profiler** panel.
2. Start a profiling recording.
3. Trigger the application state updates.
4. Stop the recording.
5. Inspect the Flamegraph and Ranked views.
6. Select `RenderingDemo` and `ExpensiveChild` to inspect their rendering behavior.

## Result

The Profiler successfully recorded **3 commits**.

The Flamegraph showed the `RenderingDemo` component and its child hierarchy during the recorded commits.

`RenderingDemo` was recorded with a render duration of approximately **2.1ms** in one commit.

`ExpensiveChild (Memo)` was shown as **did not render on the client during this profiling session** for the selected commit.

## Observation

The Profiler provides a visual representation of component rendering and commit timing. The recorded data can be used to identify components that render during state updates and components protected from unnecessary rendering by `memo`.

**Stage 5: Completed**

---

## Experiment Status

**Stage 1: Completed** — DevTools launch and connection

**Stage 2: Completed** — Component inspection

**Stage 3: Completed** — Props inspection

**Stage 4: Completed** — State inspection

**Stage 5: Completed** — Profiler and rendering analysis

# Stage 6 — JavaScript Debugging

## Objective

Use React Native DevTools Sources debugger to pause JavaScript execution, inspect the debugging context, and resume execution.

## Procedure

1. Open the **Sources** panel.
2. Open `RenderingDemo.tsx`.
3. Set a breakpoint inside the `RenderingDemo` component.
4. Trigger the corresponding application state update.
5. Verify that JavaScript execution pauses at the breakpoint.
6. Inspect the **Scope** and **Call Stack** panels.
7. Resume execution using the debugger controls.

## Result

The breakpoint was successfully triggered in `RenderingDemo.tsx`.

React Native DevTools paused JavaScript execution at the breakpoint.

The **Scope** and **Call Stack** panels were available while execution was paused.

Execution was successfully resumed using the debugger controls.

## Observation

React Native DevTools provides source-level JavaScript debugging for React Native applications. Breakpoints can be placed directly in the TypeScript source and used to inspect the execution context and call stack during runtime.

**Stage 6: Completed**

---

## Experiment Status

**Stage 1: Completed** — DevTools launch and connection

**Stage 2: Completed** — Component inspection

**Stage 3: Completed** — Props inspection

**Stage 4: Completed** — State inspection

**Stage 5: Completed** — Profiler and rendering analysis

**Stage 6: Completed** — JavaScript debugging

# Stage 6 — JavaScript Debugging

## Objective

Use React Native DevTools Sources debugger to pause JavaScript execution, inspect the debugging context, and resume execution.

## Procedure

1. Open the **Sources** panel.
2. Open `RenderingDemo.tsx`.
3. Set a breakpoint inside the `RenderingDemo` component.
4. Trigger the corresponding application state update.
5. Verify that JavaScript execution pauses at the breakpoint.
6. Inspect the **Scope** and **Call Stack** panels.
7. Resume execution using the debugger controls.

## Result

The breakpoint was successfully triggered in `RenderingDemo.tsx`.

React Native DevTools paused JavaScript execution at the breakpoint.

The **Scope** and **Call Stack** panels were available while execution was paused.

Execution was successfully resumed using the debugger controls.

## Observation

React Native DevTools provides source-level JavaScript debugging for React Native applications. Breakpoints can be placed directly in the TypeScript source and used to inspect the execution context and call stack during runtime.

**Stage 6: Completed**

---

## Experiment Status

**Stage 1: Completed** — DevTools launch and connection

**Stage 2: Completed** — Component inspection

**Stage 3: Completed** — Props inspection

**Stage 4: Completed** — State inspection

**Stage 5: Completed** — Profiler and rendering analysis

**Stage 6: Completed** — JavaScript debugging

# Stage 6 — JavaScript Debugging

## Objective

Use React Native DevTools Sources debugger to pause JavaScript execution, inspect the debugging context, and resume execution.

## Procedure

1. Open the **Sources** panel.
2. Open `RenderingDemo.tsx`.
3. Set a breakpoint inside the `RenderingDemo` component.
4. Trigger the corresponding application state update.
5. Verify that JavaScript execution pauses at the breakpoint.
6. Inspect the **Scope** and **Call Stack** panels.
7. Resume execution using the debugger controls.

## Result

The breakpoint was successfully triggered in `RenderingDemo.tsx`.

React Native DevTools paused JavaScript execution at the breakpoint.

The **Scope** and **Call Stack** panels were available while execution was paused.

Execution was successfully resumed using the debugger controls.

## Observation

React Native DevTools provides source-level JavaScript debugging for React Native applications. Breakpoints can be placed directly in the TypeScript source and used to inspect the execution context and call stack during runtime.

**Stage 6: Completed**

---

## Experiment Status

**Stage 1: Completed** — DevTools launch and connection

**Stage 2: Completed** — Component inspection

**Stage 3: Completed** — Props inspection

**Stage 4: Completed** — State inspection

**Stage 5: Completed** — Profiler and rendering analysis

**Stage 6: Completed** — JavaScript debugging

**Experiment 03: Completed**
