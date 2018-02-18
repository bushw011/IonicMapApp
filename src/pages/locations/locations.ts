import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationService } from "../../app/location/location.service";
import {Location} from "../../app/location/location";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase';


declare var google;


@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage implements OnInit{

  @ViewChild('map') mapElement;
  map: any;
  locationList: Location[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationService: LocationService) {

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LocationsPage');
    this.initMap();

  }

  initMap(){
    let latLng = new google.maps.LatLng(37.24804,-115.800155);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map.setCenter(pos);

      });
    }
    else{
      console.log('browser does not support geolocation')
    }
  }

  ngOnInit(){
    this.locationService.getLocations().subscribe(locations =>{
      console.log(locations);
      this.locationList = locations;
    });
  }


}
