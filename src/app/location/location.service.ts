import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Location} from "./location";
import { AngularFireDatabase} from "angularfire2/database";
import * as GeoFire from "geofire";
import * as firebase from 'firebase';
import {query} from "@angular/core/src/animation/dsl";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LocationService {

  geoRef: any;
  geoFire: any;
  locationObservable: Array<Observable<Location>> = [];
  hits = new BehaviorSubject([]);
  markers: any;
  filteredMarkers: any;

  constructor(public db: AngularFireDatabase) {
    this.geoRef = this.db.list('/geoData');
    this.geoFire = new GeoFire(this.geoRef.query.ref);

  }


  // Not sure if I'm gonna need this specifically for this app, but during development it can't hurt to have a client-side means of adding locations to the database
  setLocation(ID, name:string,description:string,phoneNumber,category:string, coords: Array<number>) {
    console.log('eyyy');
    this.geoFire.set(ID,coords)
      .then(_ => console.log('location updated'))
      .catch(err => console.log(err));
    this.db.object('/locationData/'+ID).update({
      name:name,
      description:description,
      category: category,
      phoneNumber: phoneNumber
    });
  }



  // Queries the database for nearby locations, and then maps to BehaviorSubject
  getLocations(radius: number, coords: Array<number>) {

    this.geoFire.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key, location, distance) => {

        let hit = {
          location: location,
          distance: distance,
          name: '',
          description: '',
          category: '',
          phoneNumber: 555
        };
        let currentHits = this.hits.value;

          this.getLocationData(key).subscribe(
            (location) =>{
              hit.name = location.name;
              hit.description = location.description;
              hit.category = location.category;
              hit.phoneNumber = location.phoneNumber;
              currentHits.push(hit);
              this.hits.next(currentHits);

            }
          );

      });
  }

  filterLocations(){
    this.hits.subscribe(hits => {
      this.markers = hits;
    });
  }


  getLocationData(ID: string): Observable<Location>{
    return this.db.object('/locationData/'+ID).valueChanges();
  }

}


