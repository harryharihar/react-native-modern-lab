# Experiment 12 — Background Native Work

## Objective

Execute CPU-heavy native work on a background thread while keeping the JavaScript thread responsive.

## Architecture

```text
JavaScript
    ↓
TurboModule
    ↓
dispatch_async()
    ↓
Native Background Queue
    ↓
50,000,000 calculations
    ↓
Promise resolve
    ↓
JavaScript
