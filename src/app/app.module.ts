import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideRemoteConfig(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.settings = { minimumFetchIntervalMillis: 0, fetchTimeoutMillis: 3600000 };
    remoteConfig.defaultConfig = { ActivaFuncionabilidad: 'false' };
    return remoteConfig;
  })
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
