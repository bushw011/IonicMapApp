import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationModalPage } from './location-modal';
import { AgmCoreModule} from '@agm/core';
import { environment} from "../../environments/environment";

@NgModule({
  declarations: [
    LocationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationModalPage),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
})
export class LocationModalPageModule {}
