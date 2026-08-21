# Experiment 06 — Android Edge-to-Edge

## Objective

Understand Android edge-to-edge behavior and how React Native handles system window insets.

## Baseline

With:

`edgeToEdgeEnabled=false`

the app content was displayed below the Android system bars.

## Edge-to-Edge Enabled

Changed:

`edgeToEdgeEnabled=true`

After rebuilding the Android application, the app used the edge-to-edge window.

## Safe Area / Insets

Removed the React Native `SafeAreaView` and used `react-native-safe-area-context`.

The physical Android device reported:

- Top inset: 32
- Bottom inset: 44
- Left inset: 0
- Right inset: 0

## Applying Insets

The content padding was adjusted dynamically using the top and bottom inset values.

This kept the application content safely away from the Android system areas.

## Result

Edge-to-edge behavior was successfully enabled and system insets were read dynamically from the physical Android device.

The content was positioned correctly after applying the top and bottom insets.

## Key Learning

Edge-to-edge does not mean ignoring system bars.

The application receives the full window and must use system inset information to prevent important UI from being obscured by status bars, navigation bars, or gesture areas.

**Experiment 06: Completed**
