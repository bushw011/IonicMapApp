import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Location} from "./location";
import {query} from "@angular/core/src/animation/dsl";
import * as firebase from 'firebase';

@Injectable()
export class LocationService {
  locationCollection: AngularFirestoreCollection<Location>;
  locations: Observable<Location[]>;
  constructor(public db: AngularFirestore){
    this.locations = this.db.collection('Locations').valueChanges();
  }

  public getLocations(){
    return this.locations;
  }

  public updateDescription(newDescription: string, locationID: string){
    return this.db.doc('Locations/'+locationID).update({
      description: newDescription
    });
  }
}
