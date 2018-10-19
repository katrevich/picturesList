import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AuthPage;

  constructor(platform: Platform, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      splashScreen.hide();
    });
    platform.registerBackButtonAction(() => {});
  }
}
