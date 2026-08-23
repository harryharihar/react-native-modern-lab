#import "NativeLabView.h"

#import <react/renderer/components/RNModernLabSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNModernLabSpec/Props.h>

using namespace facebook::react;

@implementation NativeLabView

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  NSLog(@"🔥 NativeLabView componentDescriptorProvider CALLED");

  return concreteComponentDescriptorProvider<NativeLabViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  NSLog(@"🔥 NativeLabView initWithFrame CALLED");

  if (self = [super initWithFrame:frame]) {
    NSLog(@"🔥 NativeLabView UIView CREATED");

    self.backgroundColor = [UIColor systemPinkColor];
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props
           oldProps:(Props::Shared const &)oldProps
{
  NSLog(@"🔥 NativeLabView updateProps CALLED");

  const auto &newProps =
      *std::static_pointer_cast<const NativeLabViewProps>(props);

  NSLog(@"🔥 NativeLabView title: %s", newProps.title.c_str());

  [super updateProps:props oldProps:oldProps];
}

@end
