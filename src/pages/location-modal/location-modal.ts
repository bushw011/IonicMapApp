import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-location-modal',
  templateUrl: 'location-modal.html',
})
export class LocationModalPage {

  userLat:number;
  userLong:number;
  locationLat:number;
  locationLong:number;
  name:string;
  description: string;
  distance:string;
  category: string;
  marker: any;
  phoneNumber: string;
  constructor(public navCtrl: NavController, private navParams: NavParams, private view: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationModalPage');
    const locationData = this.navParams.get('data');
    console.log(locationData);
    this.marker = locationData.marker;
    console.log(locationData.marker.name);
    this.phoneNumber = this.formatPhoneNumber(locationData.phoneNumber);
    this.userLat = locationData.userLat;
    this.userLong = locationData.userLong;
    this.locationLat = locationData.lat;
    this.locationLong = locationData.long;
    this.name = locationData.name;
    this.description = locationData.description;
    this.category = locationData.category;
    this.distance = locationData.distance;
  }

  formatPhoneNumber(str:string):string{
    return "("+str.substring(0,3)+") "+str.substring(3,6)+"-"+str.substring(6,11);
  }



  closeModal(){
    this.view.dismiss();
  }

}
