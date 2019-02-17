import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocationsPage} from "../locations/locations";
import {EmailFormPage} from "../email-form/email-form";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  locations = LocationsPage;
  emailForm = EmailFormPage;
  loginForm = LoginPage;

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  navigateToLogin() {
    this.navCtrl.push(this.loginForm);
  }

  navigateToLocations(){
    this.navCtrl.push(this.locations);
  }

  navigateToForm(category: string){
    this.navCtrl.push(this.emailForm, {
      category: category
    });
  }

}
