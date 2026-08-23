# Experiment 13 — Fabric

## Status

✅ Completed

## Objective

Demonstrate a custom native React Native component using the Fabric architecture and React Native Codegen.

The experiment verifies the complete path from a TypeScript native component specification to a real native iOS UIView rendered through Fabric.

## What We Built

We created a custom native component named `NativeLabView`.

The component is defined in TypeScript and implemented as a native iOS Fabric component using Objective-C++.

The component accepts a `title` prop from React Native and renders a native iOS view.

The implementation uses:

- `codegenNativeComponent`
- React Native Codegen
- Fabric ComponentDescriptor
- Fabric ShadowNode generation
- `RCTViewComponentView`
- Objective-C++
- Native prop handling

The architecture flow is:

```text
React Native JSX
      ↓
NativeLabViewNativeComponent.ts
      ↓
React Native Codegen
      ↓
RNModernLabSpec
      ↓
ShadowNode + Props + ComponentDescriptor
      ↓
Fabric Renderer
      ↓
NativeLabView
      ↓
RCTViewComponentView
      ↓
UIKit UIView
```

## 1. TypeScript Component Specification

### File

`specs/NativeLabViewNativeComponent.ts`

The component specification is:

```tsx
import type {HostComponent, ViewProps} from 'react-native';
import {codegenNativeComponent} from 'react-native';

export interface NativeLabViewProps extends ViewProps {
  title?: string;
}

export default codegenNativeComponent<NativeLabViewProps>(
  'NativeLabView',
) as HostComponent<NativeLabViewProps>;
```

The `NativeLabViewProps` interface defines the props that can be passed from React Native to the native Fabric component.

The `title` property is used in this experiment to demonstrate prop delivery from JavaScript to the native implementation.

`codegenNativeComponent` declares `NativeLabView` as a native component that can be processed by React Native Codegen.

## 2. Codegen Configuration

### File

`package.json`

The project uses the following Codegen configuration:

```json
"codegenConfig": {
  "name": "RNModernLabSpec",
  "type": "all",
  "jsSrcsDir": "specs",
  "ios": {
    "componentProvider": {
      "NativeLabView": "NativeLabView"
    }
  }
}
```

The `name` identifies the Codegen specification as `RNModernLabSpec`.

The `jsSrcsDir` points Codegen to the `specs` directory containing the native component specification.

The iOS `componentProvider` maps the JavaScript component name `NativeLabView` to the native iOS class `NativeLabView`.

This configuration allows React Native Codegen to generate the Fabric artifacts required by the native component.

## 3. Generated Codegen Artifacts

After running:

```bash
npx react-native codegen
```

React Native generated the Fabric artifacts under:

```text
build/generated/ios/ReactCodegen/react/renderer/components/RNModernLabSpec/
```

The generated component files include:

```text
ComponentDescriptors.cpp
ComponentDescriptors.h
EventEmitters.cpp
EventEmitters.h
Props.cpp
Props.h
RCTComponentViewHelpers.h
ShadowNodes.cpp
ShadowNodes.h
States.cpp
States.h
```

We verified that the generated `ComponentDescriptors.h` contains:

```cpp
using NativeLabViewComponentDescriptor = ConcreteComponentDescriptor<NativeLabViewShadowNode>;
```

This confirms that Codegen generated a Fabric `ComponentDescriptor` for `NativeLabView` and associated it with the generated `NativeLabViewShadowNode`.

## 4. Native Fabric Component

### NativeLabView.h

File:

```text
ios/RNModernLab/NativeLabView.h
```

The native component inherits from `RCTViewComponentView`:

```objc
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeLabView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END
```

`RCTViewComponentView` is the Fabric native view base used by our component.

### NativeLabView.mm

File:

```text
ios/RNModernLab/NativeLabView.mm
```

The native implementation provides the generated Fabric `ComponentDescriptor`:

```cpp
+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<NativeLabViewComponentDescriptor>();
}
```

The native view is created using `initWithFrame:` and a pink background is applied so that the native UIKit view can be visually identified in the simulator.

The implementation also overrides `updateProps` to receive the generated `NativeLabViewProps` from Fabric.

## 5. Native Prop Propagation

The React Native component passes the following prop:

```tsx
<NativeLabView
  title="Hello from Fabric"
  style={styles.nativeView}
/>
```

Fabric delivers the generated props to the native component through `updateProps`:

```cpp
- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps
{
  const auto &newProps =
      *std::static_pointer_cast<const NativeLabViewProps>(props);

  NSLog(@"🔥 NativeLabView title: %s", newProps.title.c_str());

  [super updateProps:props oldProps:oldProps];
}
```

### Issue Encountered

During development, the implementation initially attempted to use:

```cpp
newProps.title.has_value()
```

Xcode reported:

```text
No member named has_value in std::string
```

The generated Codegen property was a `std::string`, so `has_value()` was not available.

The implementation was corrected to use:

```cpp
newProps.title.c_str()
```

After this correction, the project compiled successfully and the runtime log confirmed that the prop reached the native component.

## 6. Runtime Verification

The application was successfully built and launched on the iPhone 17 Pro simulator with Fabric enabled.

The React Native runtime confirmed:

```text
Running "RNModernLab" with {"rootTag":11,"initialProps":{},"fabric":true}
```

The native component produced the following logs:

```text
🔥 NativeLabView componentDescriptorProvider CALLED
🔥 NativeLabView initWithFrame CALLED
🔥 NativeLabView UIView CREATED
🔥 NativeLabView updateProps CALLED
🔥 NativeLabView title: Hello from Fabric
```

These logs verify that:

1. Fabric resolved the `NativeLabView` ComponentDescriptor.
2. The native `NativeLabView` view was instantiated.
3. The underlying UIKit view was successfully created.
4. Fabric delivered the generated props to the native component.
5. The `title` value `Hello from Fabric` successfully travelled from React Native to Objective-C++.

The simulator also displayed the custom native view with the configured pink background, providing visual confirmation that the native Fabric component was rendered.

## 7. Key Learnings

This experiment demonstrated how a Fabric native component is connected end-to-end.

The important concepts demonstrated were:

- React Native Codegen
- Generated native Props
- Generated ShadowNode
- Fabric ComponentDescriptor
- Fabric native ComponentView
- Objective-C++ native implementation
- Native prop propagation
- UIKit view creation

A TypeScript component specification can therefore define the contract that Codegen uses to generate the native Fabric types required by the renderer.

The experiment also demonstrated that the generated C++ type must be inspected when working with Codegen properties. In this case, `title` was generated as `std::string`, which meant that `has_value()` could not be used.

## 8. Result

✅ Experiment 13 — Fabric completed successfully.

The custom `NativeLabView` was successfully rendered through React Native Fabric on the iPhone 17 Pro simulator.

The complete verified flow was:

```text
React Native JSX
      ↓
TypeScript Codegen Specification
      ↓
React Native Codegen
      ↓
Generated Props + ShadowNode
      ↓
ComponentDescriptor
      ↓
Fabric Renderer
      ↓
NativeLabView
      ↓
RCTViewComponentView
      ↓
UIKit UIView
```

Runtime logs confirmed ComponentDescriptor resolution, native view creation, `updateProps` execution, and successful delivery of the `Hello from Fabric` title prop.
