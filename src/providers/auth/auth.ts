import { Injectable } from '@angular/core';
import { TouchID } from '@ionic-native/touch-id';
import { Platform } from 'ionic-angular';

@Injectable()
export class AuthProvider {
  touchIdAvailable: boolean = false;

  constructor(
    private touchId: TouchID,
    private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.touchId.isAvailable().then(() => {
        this.touchIdAvailable = true;
        console.log('touch id is available')
      }).catch(() => {
        this.touchIdAvailable = false;
        console.log('touch id is not available') 
      });
    });
  }

  async authenticate() {
    await this.touchId.isAvailable();
    return await this.touchId.verifyFingerprint('Scan your fingerprint please');
  }
}
