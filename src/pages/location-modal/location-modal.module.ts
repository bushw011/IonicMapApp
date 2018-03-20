import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationModalPage } from './location-modal';

@NgModule({
  declarations: [
    LocationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationModalPage),
  ],
})
export class LocationModalPageModule {}
