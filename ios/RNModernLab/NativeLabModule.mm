#import "NativeLabModule.h"

#import <ReactCodegen/RNModernLabSpec/RNModernLabSpec.h>

using namespace facebook::react;

@interface NativeLabModule () <NativeLabModuleSpec>
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

@end
