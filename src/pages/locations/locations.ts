import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../app/location/location";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {LocationService} from "../../app/location/location.service";
import { AlertController } from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HomePage} from "../home/home";

declare var google;

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})


export class LocationsPage {

  @ViewChild('map') mapElement;
  map: any;
  locationObservable: Observable<Location[]>;
  locationList: Location[] = [];
  locationIDs: string[] = [];
  private userLat: number;
  private userLong: number;
  newLocationID: string;
  markers: any;
  locationName: string;
  locationDescription: string;

  radius: number = 500;

  home = HomePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              public db: AngularFirestore,
              private locationService: LocationService
              ) {
    this.navCtrl = navCtrl;


  }



  ionViewDidLeave(){
    this.locationService.hits = new BehaviorSubject([]);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LocationsPage');
    this.locationIDs = [];

    this.getUserLocation();
    this.locationService.hits.subscribe(hits => {
      this.markers = hits;
    });
  }

  createLocation() {
    let alert = this.alertCtrl.create({
      title: 'Add New Location',
      message: 'Please enter in the appropriate information',
      inputs: [
        {
          name: 'title',
          placeholder: 'Location Name'
        },
        {
          name: 'description',
          placeholder: 'Location Description'
        },
        {
          name: 'latitude',
          type: 'number',
          placeholder: 'latitude'
        },
        {
          name: 'longitude',
          type: 'number',
          placeholder: 'longitude'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data =>{
            console.log(data);
          }
        },
        {
          text: 'Add Location',
          handler: data => {
            let coords = [+data.latitude,+data.longitude];
            this.addLocation(data.title, data.description,coords);
          }
        }

      ]
    });
    alert.present();
  }

  private addLocation(name:string, description:string, coords:Array<number>) {
    console.log(name);
    console.log(coords);
    this.newLocationID = this.generateID();
    this.locationService.setLocation(this.newLocationID,name,description,coords);
  }

  private generateID(): string {
    return Math.random().toString(36).substr(2,9);
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLat = position.coords.latitude;
        this.userLong = position.coords.longitude;

        this.locationService.getLocations(this.radius, [this.userLat, this.userLong]);
        console.log(this.locationService.hits);
      });
    }
  }





  ionViewDidEnter() {

  }

  private searchNewRadius(rad: number) {
    this.locationService.hits = new BehaviorSubject([]);
    console.log(rad);
    this.locationService.getLocations(rad, [this.userLat,this.userLong]);
    this.locationService.hits.subscribe(hits => {
      this.markers = hits;
    });
  }




  /* This function uses the Haversine formula to calculate distance between two GeoPoints,
  which is basically a nice alternative to using Google's API.
  Credit: https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
   */
  getDistance(myLocation: Location, targetLocation: Location){
    var R = 6378137; //Earth's mean radius in meter
    var dLat = this.rad(targetLocation.coordinates._lat - myLocation.coordinates._lat);
    var dLong = this.rad(targetLocation.coordinates._long - myLocation.coordinates._long);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(myLocation.coordinates._lat)) * Math.cos(this.rad(targetLocation.coordinates._lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1 - a));
    var d = R * c;
    return d;

  }

  rad(x:number){
    return x * Math.PI / 180;
  }



}


