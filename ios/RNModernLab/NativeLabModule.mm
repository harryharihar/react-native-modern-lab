#import "NativeLabModule.h"

#import <ReactCodegen/RNModernLabSpec/RNModernLabSpec.h>
#import <ReactCommon/RCTTurboModuleWithJSIBindings.h>

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

  facebook::jsi::Object jsiObject(runtime);

  jsiObject.setProperty(
      runtime,
      "multiply",
      std::move(multiply));

  runtime.global().setProperty(
      runtime,
      "__RNModernLabJSI",
      std::move(jsiObject));
}

@end
