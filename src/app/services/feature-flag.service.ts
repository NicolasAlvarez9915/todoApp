import { Injectable } from '@angular/core';
import { RemoteConfig } from '@angular/fire/remote-config';
import { fetchAndActivate, getValue } from 'firebase/remote-config';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  constructor(private remoteConfig: RemoteConfig) { }

  async isFeatureEnabled(): Promise<boolean> {
    try {
      const activated = await fetchAndActivate(this.remoteConfig);
      const feature = getValue(this.remoteConfig, 'ActivaFuncionabilidad');

      return feature.asBoolean();
    } catch (error) {
      console.error('Error fetching Remote Config:', error);
      return false;
    }
  }
}
