import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Location} from "../../app/location/location";
import {LocationsPage} from "./locations";
import {LocationService} from "../../app/location/location.service";
import {FormsModule} from "@angular/forms";
import {} from 'jasmine';
import {Observable} from "rxjs/Observable";


describe("Location List", () => {

  let locationList: LocationsPage;
  let fixture: ComponentFixture<LocationsPage>;

  let locationServiceStub: {
    getLocations: () => Observable<Location[]>
  };

  beforeEach(async(() => {
    // stub of mock locations
    locationServiceStub = {
      getLocations: () => Observable.of([
        {
          ID: 'auto_place1',
          name: 'Auto Insurance Place',
          category: 'Auto',
          description: 'This is an auto insurance location'
        },
        {
          ID: 'home_place1',
          name: 'Home Insurance Place',
          category: 'Home',
          description: 'This is a home insurance location'
        },
        {
          ID: 'home&auto_place1',
          name: 'Home & Auto Insurance Place',
          category: 'Home & Auto',
          description: 'This is a home & auto insurance location'
        }
      ])
    };



    TestBed.configureTestingModule({
      declarations: [LocationsPage],
      imports: [FormsModule],
      providers: [{provide: LocationService, useValue: locationServiceStub}]
    })


  }));



});
