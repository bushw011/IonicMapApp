import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-email-form',
  templateUrl: 'email-form.html',
})
export class EmailFormPage {

  firstName: string = '';
  lastName: string = '';
  category: string = 'none';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailFormPage');
  }

}
