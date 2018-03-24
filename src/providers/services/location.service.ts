import { DataProvider } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

    private locations = [];
    
    constructor(data: DataProvider) {
        data.generateLocations("../../assets/data/locations.json")
          .subscribe( data => this.locations = data);
      }
}