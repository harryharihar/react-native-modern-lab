# Experiment 03 — React Native DevTools

## Status

🔄 In Progress

## Objective

Explore React Native DevTools and understand how to inspect React Native components, props, state, component hierarchy, console output, and rendering behavior.

## Topics

- React Native DevTools
- Component inspection
- Component tree
- Props inspection
- State inspection
- Console
- Profiler
- Performance investigation

## Experiment Plan

### Stage 1 — Launch React Native DevTools

Verify that React Native DevTools can connect to the running application.

### Stage 2 — Component Inspection

Inspect the React component hierarchy and identify application components.

### Stage 3 — Props Inspection

Inspect component props and understand how data flows between components.

### Stage 4 — State Inspection

Inspect component state and observe state changes.

### Stage 5 — Console

Use the DevTools Console to inspect application output and debugging information.

### Stage 6 — Profiler

Use the Profiler to investigate component rendering.

### Stage 7 — Conclusion

Document the findings and practical debugging workflow.



## Stage 3 — Props Inspection

The Components panel was used to inspect component props.

### RenderingDemo

Selecting `RenderingDemo` showed the component in the React component tree.

The DevTools panel exposed the component's hooks and debugging information.

### ExpensiveChild

Selecting `ExpensiveChild` allowed inspection of the props passed to the component.

The experiment passes the current user name:

```tsx
<ExpensiveChild name={name} />
