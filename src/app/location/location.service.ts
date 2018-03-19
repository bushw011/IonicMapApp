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
  locationList: Location[] = [];
  hits = new BehaviorSubject([]);


  constructor(public db: AngularFireDatabase) {
    this.geoRef = this.db.list('/geoData');
    this.geoFire = new GeoFire(this.geoRef.query.ref);

  }


  // Not sure if I'm gonna need this specifically for this app, but during development it can't hurt to have a client-side means of adding locations to the database
  setLocation(ID, name:string,description:string, coords: Array<number>) {
    console.log('eyyy');
    this.geoFire.set(ID,coords)
      .then(_ => console.log('location updated'))
      .catch(err => console.log(err));
    this.db.object('/locationData/'+ID).update({
      name:name,
      description:description
    });
  }



  // Queries the database for nearby locations, and then maps to BehaviorSubject
  getLocations(radius: number, coords: Array<number>) {
    let newName = '';
    let newDescription = '';

    this.geoFire.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key, location, distance) => {


        console.log(newName);
        let hit = {
          location: location,
          distance: distance,
          ID: key,
          name: '',
          description: ''
        };
        console.log(hit.name);
        let currentHits = this.hits.value;


          this.getLocationData(hit.ID).subscribe(
            (location) =>{
              newName = location.name;
              hit.name = location.name;
              hit.description = location.description;
              currentHits.push(hit);
            }
          );


        
      });

  }
  getLocationData(ID: string): Observable<Location>{
    return this.db.object('/locationData/'+ID).valueChanges();
  }

}


