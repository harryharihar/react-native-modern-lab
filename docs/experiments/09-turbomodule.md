# Experiment 09 — TurboModule Runtime

## Objective

Implement and verify a React Native TurboModule using the New Architecture, TypeScript Codegen, Objective-C++, and JSI.

## Architecture

TypeScript Spec
→ React Native Codegen
→ Generated TurboModule specification
→ Objective-C++ implementation
→ TurboModule / JSI
→ JavaScript runtime

## TypeScript Specification

The TurboModule contract is defined in:

`specs/NativeLabModule.ts`

It exposes:

```ts
getMessage(): string
