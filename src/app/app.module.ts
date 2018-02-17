import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {LocationsPage} from "../pages/locations/locations";



// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAu-yv5yCQaVOxNNJmsnRe5zGWSX0fg_is",
  authDomain: "ionicmapapp-d56b5.firebaseapp.com",
  databaseURL: "https://ionicmapapp-d56b5.firebaseio.com",
  projectId: "ionicmapapp-d56b5",
  storageBucket: "ionicmapapp-d56b5.appspot.com",
  messagingSenderId: "176683947764"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
