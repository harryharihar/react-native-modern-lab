# Experiment 07 — Metro Configuration

## Objective

Understand how Metro resolves React Native modules and how its resolver configuration can be customized.

## Baseline

The default React Native Metro configuration supports JavaScript and TypeScript source extensions including js, jsx, json, ts and tsx.

The default configuration did not include the cjs extension.

## Experiment

We extended Metro sourceExts to support cjs while preserving the existing React Native extensions.

```js
const {getDefaultConfig, mergeConfig} = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, "cjs"],
  },
};

module.exports = mergeConfig(defaultConfig, config);
```

## Test Module

Created src/experiments/metro/test-module.cjs:

```js
module.exports = {
  message: "Metro CJS module works",
};
```

The module was imported from App.tsx and successfully displayed in the iOS Simulator.

## Verification

Displayed result:

Metro CJS module works

This confirms that Metro successfully resolved and bundled the custom cjs module.

## Metro vs Babel

Metro handles module resolution, dependency graphs, assets and bundling.

Babel handles JavaScript and TypeScript transformation.

## Key Learning

Metro configuration should extend the existing React Native defaults rather than replace them.

## Result

**Completed**

Metro successfully resolved and bundled a custom cjs module on iOS.
