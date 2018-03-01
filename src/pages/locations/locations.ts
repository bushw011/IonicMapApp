import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../app/location/location";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {LocationService} from "../../app/location/location.service";
import { AlertController } from "ionic-angular";

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
  locationList: Location[];
  private userLat: number;
  private userLong: number;
  markers: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              public db: AngularFirestore,
              private locationService: LocationService
              ) {
    this.locationObservable = this.db.collection('Locations').valueChanges();


  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LocationsPage');
    this.getUserLocation();
    this.locationService.hits.subscribe(hits => this.markers = hits);

    //this.initMap();
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
            this.seedDB(data.title, data.description, data.latitude, data.longitude);
          }
        }

      ]
    });
    alert.present();
  }

  private seedDB(name:string, description:string, latitude, longitude) {
    console.log(name);
    let coords = [+latitude,+longitude];
    console.log(coords);
    this.locationService.setLocation(name,description,coords);
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLat = position.coords.latitude;
        this.userLong = position.coords.longitude;

        this.locationService.getLocations(500, [this.userLat, this.userLong])
      });
    }
  }

  ionViewDidEnter() {
    console.log('did enter');
    this.getLocations().subscribe(locations =>{
      console.log(locations);
      this.locationList = locations;
    });

  }

  public getLocations(){
    return this.locationObservable;
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


