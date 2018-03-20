import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-location-modal',
  templateUrl: 'location-modal.html',
})
export class LocationModalPage {

  constructor(public navCtrl: NavController, private navParams: NavParams, private view: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationModalPage');
    const locationData = this.navParams.get('data');
    console.log(locationData);
  }

  closeModal(){
    this.view.dismiss();
  }

}
