import type {HostComponent, ViewProps} from 'react-native';
import {codegenNativeComponent} from 'react-native';

export interface NativeLabViewProps extends ViewProps {
  title?: string;
}

export default codegenNativeComponent<NativeLabViewProps>(
  'NativeLabView',
) as HostComponent<NativeLabViewProps>;
