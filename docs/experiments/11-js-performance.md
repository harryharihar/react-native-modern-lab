# Experiment 11 — JS Performance

## Objective

Compare CPU-heavy JavaScript execution with native JSI execution.

The experiment demonstrates how expensive synchronous computation can block the JavaScript thread and how a native JSI Host Function can perform the same computation more efficiently.

## Implementation

### JavaScript Thread

The JavaScript implementation performs a CPU-heavy loop of 50 million iterations directly on the JavaScript thread.

```text
50,000,000 iterations
        ↓
JavaScript thread
        ↓
CPU-heavy computation
        ↓
Result + execution duration
