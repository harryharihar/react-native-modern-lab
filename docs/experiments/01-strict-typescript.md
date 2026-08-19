# Experiment 01 — Strict TypeScript API

## Objective

Investigate how strict TypeScript can improve API handling in a React Native application.

## What I Tested

- Typed API responses
- TypeScript generics
- Discriminated unions
- Type narrowing
- Promise typing
- Compile-time validation

## What I Learned

1. Avoid using any for API contracts.
2. Generics make API response models reusable.
3. Discriminated unions provide safe success/error handling.
4. Type narrowing provides safer application logic.
5. TypeScript can catch errors before runtime.
6. npx tsc --noEmit can validate the TypeScript project.

## TypeScript Validation

Command:

    npx tsc --noEmit

Result: No TypeScript errors.

## Runtime Validation

The application was successfully built and launched on the iPhone 17 Pro iOS simulator.

The typed user response was rendered in the React Native UI.

## Finding

The initial Promise implementation caused a TypeScript error because the inferred Promise resolver type did not match the setTimeout callback.

The issue was fixed with explicit Promise typing:

    new Promise<void>(resolve => {
      setTimeout(resolve, 500);
    });

## Result

Experiment completed successfully.
