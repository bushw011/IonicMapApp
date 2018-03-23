import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../app/location/location";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {LocationService} from "../../app/location/location.service";
import { AlertController } from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HomePage} from "../home/home";
import {LocationModalPage} from "../location-modal/location-modal";

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})


export class LocationsPage {

  locationObservable: Observable<Location[]>;
  locationList: Location[] = [];
  locationIDs: string[] = [];
  private userLat: number;
  private userLong: number;
  newLocationID: string;
  markers: any;
  filteredMarkers: any;

  locationCategory: string = '';



  locationName: string;
  locationDescription: string;



  radius: number = 80.4672;

  home = HomePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private modal: ModalController,
              private alertCtrl: AlertController,
              public db: AngularFirestore,
              private locationService: LocationService
              ) {
    this.navCtrl = navCtrl;
    if(this.navParams.get('category')!=null)
    this.locationCategory = this.navParams.get('category');
    console.log(this.locationCategory);

  }

  openLocationModal(marker) {
    const data = {
      name: marker.name,
      description: marker.description,
      distance: (marker.distance/1.609344).toFixed(2),
      category: marker.category,
      userLat: this.userLat,
      userLong: this.userLong,
      lat: marker.location[0],
      long: marker.location[1]
    };
    console.log(data.name,data.description,data.distance);
    const locationModal = this.modal.create('LocationModalPage', {data:data});
    locationModal.present();
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
      console.log(this.markers);
      this.filterLocations(this.locationCategory, this.markers);
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
          name: 'category',
          placeholder: 'Services offered by location'
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
            this.addLocation(data.title, data.description,data.category,coords);
          }
        }

      ]
    });
    alert.present();
  }


  private addLocation(name:string, description:string,category:string, coords:Array<number>) {
    console.log(name);
    console.log(coords);
    this.newLocationID = this.generateID();
    this.locationService.setLocation(this.newLocationID,name,description,category,coords);
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

  updateSearchParams(){
    this.searchNewRadius(this.radius).subscribe(locations => {
      this.filterLocations(this.locationCategory,locations)
    });
  }

  filterLocations(category: string, markers) {
    markers.sort((a,b) => {
      return a.distance - b.distance;
    });
    this.filteredMarkers = markers;
    //console.log('markers to be filtered: ', this.filteredMarkers, 'category: ',category);
    if (category != ''){
      category = category.toLocaleLowerCase();
      this.filteredMarkers = this.filteredMarkers.filter(location => {
        //console.log(this.filteredMarkers);
         return !category || location.category.toLowerCase().indexOf(category) !== -1;
      })
    }
    return this.filteredMarkers;
  }




  ionViewDidEnter() {

  }

  private searchNewRadius(rad: number) {
    this.locationService.hits = new BehaviorSubject([]);
    console.log(rad);
    this.locationService.getLocations(rad, [this.userLat,this.userLong]);
    this.locationService.hits.subscribe(hits => {
      this.markers = hits;
      this.filterLocations(this.locationCategory,this.markers);

    });
  }





}


