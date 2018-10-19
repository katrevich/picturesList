import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TouchID } from '@ionic-native/touch-id';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { FilePath } from '@ionic-native/file-path';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { AuthPage } from '../pages/auth/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { ImagesProvider } from '../providers/images/images';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ListPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ListPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    TouchID,
    File,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Camera,
    NativeStorage,
    ImagesProvider,
    FilePath,
    Diagnostic
  ]
})
export class AppModule {}
