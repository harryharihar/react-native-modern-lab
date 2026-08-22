#import "NativeLabModule.h"

#import <ReactCodegen/RNModernLabSpec/RNModernLabSpec.h>
#import <ReactCommon/RCTTurboModuleWithJSIBindings.h>

#include <cmath>
#include <dispatch/dispatch.h>

using namespace facebook::react;

@interface NativeLabModule () <NativeLabModuleSpec, RCTTurboModuleWithJSIBindings>
@end

@implementation NativeLabModule

RCT_EXPORT_MODULE(NativeLabModule)

- (NSString *)getMessage
{
  return @"Hello from a TurboModule";
}

- (std::shared_ptr<TurboModule>)getTurboModule:
    (const ObjCTurboModule::InitParams &)params
{
  return std::make_shared<NativeLabModuleSpecJSI>(params);
}

#pragma mark - Background Native Computation

- (void)startBackgroundComputation:
    (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
{
  dispatch_async(
      dispatch_get_global_queue(QOS_CLASS_USER_INITIATED, 0),
      ^{
        double result = 0.0;

        for (int i = 0; i < 50'000'000; i++) {
          result += std::sqrt(static_cast<double>(i));
        }

        resolve(@(result));
      });
}

#pragma mark - Direct JSI

- (void)installJSIBindingsWithRuntime:(facebook::jsi::Runtime &)runtime
                          callInvoker:(const std::shared_ptr<facebook::react::CallInvoker> &)callInvoker
{
  auto multiply = facebook::jsi::Function::createFromHostFunction(
      runtime,
      facebook::jsi::PropNameID::forAscii(runtime, "multiply"),
      2,
      [](facebook::jsi::Runtime &runtime,
         const facebook::jsi::Value &,
         const facebook::jsi::Value *args,
         size_t count) -> facebook::jsi::Value {

        if (count < 2 ||
            !args[0].isNumber() ||
            !args[1].isNumber()) {
          throw facebook::jsi::JSError(
              runtime,
              "multiply() requires two numbers");
        }

        return facebook::jsi::Value(
            args[0].asNumber() * args[1].asNumber());
      });

  auto heavyComputation = facebook::jsi::Function::createFromHostFunction(
      runtime,
      facebook::jsi::PropNameID::forAscii(runtime, "heavyComputation"),
      0,
      [](facebook::jsi::Runtime &runtime,
         const facebook::jsi::Value &,
         const facebook::jsi::Value *,
         size_t) -> facebook::jsi::Value {

        double result = 0.0;

        for (int i = 0; i < 50'000'000; i++) {
          result += std::sqrt(static_cast<double>(i));
        }

        return facebook::jsi::Value(result);
      });

  facebook::jsi::Object jsiObject(runtime);

  jsiObject.setProperty(
      runtime,
      "multiply",
      std::move(multiply));

  jsiObject.setProperty(
      runtime,
      "heavyComputation",
      std::move(heavyComputation));

  runtime.global().setProperty(
      runtime,
      "__RNModernLabJSI",
      std::move(jsiObject));
}

@end
