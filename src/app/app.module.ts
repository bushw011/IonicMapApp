import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { environment } from "../environments/environment";
import { LocationService } from "./location/location.service";

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {LocationsPage} from "../pages/locations/locations";
import {EmailFormPage} from "../pages/email-form/email-form";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireAuthModule} from "angularfire2/auth";
import { AgmCoreModule} from '@agm/core';


import * as firebase from 'firebase';

AngularFirestoreModule.enablePersistence();
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationsPage,
    EmailFormPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationsPage,
    HomePage,
    EmailFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
