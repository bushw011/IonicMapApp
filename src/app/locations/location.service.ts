import {Injectable} from "@angular/core";
import {AngularFirestore, QueryFn} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Location} from "./location";
import {query} from "@angular/core/src/animation/dsl";


@Injectable()
export class LocationService {

  constructor(public db: AngularFirestore){

  }

  public getLocations(){

  }

  public updateDescription(newDescription: string, locationID: string){
    return this.db.doc('Locations/'+locationID).update({
      description: newDescription
    });
  }
}
