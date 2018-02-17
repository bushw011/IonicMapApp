import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationService} from "../../app/locations/location.service";
import {LocationId} from "../../app/locations/location";
import {AngularFirestore} from "angularfire2/firestore";
import {Location} from "../../app/locations/location";
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let db = firebase.firestore();
    db.collection('Locations').get().then((querySnapshot)=>{
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
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

    //this.locationService.getLocations();

  }

}
