import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getMessage(): string;

  startBackgroundComputation(): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeLabModule');
