import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../app/location/location";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

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


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public db: AngularFirestore
              ) {
    this.locationObservable = this.db.collection('Locations').valueChanges();


  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LocationsPage');
    this.initMap();

  }

  ionViewDidEnter() {
    console.log('did enter');
    this.getLocations().subscribe(locations =>{
      console.log(locations);
      this.locationList = locations;
      this.setMarkers(locations);
    });

  }

  public getLocations(){
    return this.locationObservable;
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
        let myMarker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: 'user location'
        });
      });
    }
    else{
      console.log('browser does not support geolocation')
    }
  }

  public setMarkers(locations: Location[]){
    for(var i = 0; i < locations.length;i++){
      this.addMarker(locations[i]);
    }
    return locations;
  }

  addMarker(location: Location){
    let newMarker = new google.maps.Marker({
      position: {
        lat: location.coordinates._lat,
        lng: location.coordinates._long
      },
      map: this.map,
      title: 'Selected location marker'
    });

  }



}
