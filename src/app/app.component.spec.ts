import {async, TestBed} from "@angular/core/testing";
import { IonicModule, Platform} from "ionic-angular";

import{ StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import{ MyApp} from "./app.component";

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';
