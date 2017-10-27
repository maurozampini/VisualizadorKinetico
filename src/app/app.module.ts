import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuVotaPage } from '../pages/menu-vota/menu-vota';
import { MenuVisualizadorPage } from '../pages/menu-visualizador/menu-visualizador';
import { FotosPage} from '../pages/fotos/fotos';

import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Vibration } from '@ionic-native/vibration';
import { IonicAudioModule } from 'ionic-audio';
import { AudioProvider } from 'ionic-audio';

import { NativeAudio } from '@ionic-native/native-audio';



export const firebaseConfig = {
  apiKey: "AIzaSyBMcF2w07cGdaP0pO29oE8fX5CgaKuYm7s",
  authDomain: "appvisualizador.firebaseapp.com",
  databaseURL: "https://appvisualizador.firebaseio.com",
  projectId: "appvisualizador",
  storageBucket: "appvisualizador.appspot.com",
  messagingSenderId: "738835581280"
};
  

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    FotosPage,
    MenuVotaPage,
    MenuVisualizadorPage
  ],
  imports: [
    BrowserModule,
    IonicAudioModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FotosPage,
    LoginPage,
    RegisterPage,
    MenuVotaPage,
    MenuVisualizadorPage
  ],
  providers: [
    StatusBar,
    Vibration,
    NativeAudio,
    DeviceMotion,
    IonicAudioModule,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
