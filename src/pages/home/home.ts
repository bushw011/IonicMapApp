import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocationsPage} from "../locations/locations";
import {EmailFormPage} from "../email-form/email-form";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  locations = LocationsPage;
  emailForm = EmailFormPage;

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  navigateToLocations(){
    this.navCtrl.push(this.locations);
  }

  navigateToForm(){
    this.navCtrl.push(this.emailForm);
  }

}
