import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  error: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthProvider,
    private platform: Platform,
  ) {
    
  }

  login() {
    if (this.platform.is('android')) {
      this.navCtrl.push(TabsPage);
      return;
    }
    this.auth.authenticate().then(() => {
      this.navCtrl.push(TabsPage);
    }).catch((error) => {
      this.error = error.localizedDescription;
    })
  }
}
