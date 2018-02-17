import {Injectable} from "@angular/core";
import {AngularFirestore, QueryFn} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Location} from "./location";

@Injectable()
export class LocationsService {

  constructor(public db: AngularFirestore){

  }

  public getLocations(queryFn?: QueryFn): Observable<Location[]> {
    let locationCollection = this.db.collection<Location>('Locations', queryFn);
    let locations = locationCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Location;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    });

    return locations;
  }

  public updateDescription(newDescription: string, locationID: string){
    return this.db.doc('Locations/'+locationID).update({
      description: newDescription
    });
  }
}
