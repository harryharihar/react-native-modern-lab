# Experiment 10 — Direct JSI

## Objective

Demonstrate a direct JSI binding in React Native using Objective-C++, without exposing the operation through the normal JavaScript-to-native module method path.

## Architecture

```text
JavaScript
    ↓
global.__RNModernLabJSI
    ↓
JSI Host Function
    ↓
Objective-C++ installJSIBindingsWithRuntime
    ↓
Native multiplication
