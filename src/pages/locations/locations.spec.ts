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
    getLocations: () => Observable<any[]>
  };

  beforeEach(async(() => {
    // stub of mock locations
    locationServiceStub = {
      getLocations: () => Observable.of([
        {
          ID: 'auto_place1',
          name: 'Auto Insurance Place',
          category: 'Auto',
          description: 'This is an auto insurance location',
          distance: 5.1
        },
        {
          ID: 'home_place1',
          name: 'Home Insurance Place',
          category: 'Home',
          description: 'This is a home insurance location',
          distance: 22.923
        },
        {
          ID: 'home&auto_place1',
          name: 'Home & Auto Insurance Place',
          category: 'Home & Auto',
          description: 'This is a home & auto insurance location',
          distance: 4
        },
        {
          ID: 'auto_place2',
          name: 'Auto Insurance Place 2',
          category: 'Auto',
          description: 'This is an auto insurance location',
          distance: 10.8193
        },
        {
          ID: 'home&auto_place2',
          name: 'Home & Auto Insurance Place',
          category: 'Home & Auto',
          description: 'This is a home & auto insurance location',
          distance: 3.1231
        },
        {
          ID: 'home_place2',
          name: 'Home Insurance Place 2',
          category: 'Home',
          description: 'This is a home insurance location',
          distance: 6.021
        }
      ])
    };



    TestBed.configureTestingModule({
      declarations: [LocationsPage],
      imports: [FormsModule],
      providers: [{provide: LocationService, useValue: locationServiceStub}]
    });

    beforeEach(async(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(LocationsPage);
        locationList = fixture.componentInstance;
        fixture.detectChanges();
      })
    }));




  }));



});
