import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getMessage(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeLabModule');
