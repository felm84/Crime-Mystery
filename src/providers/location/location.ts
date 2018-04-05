import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ILocation } from '../interface/location';

@Injectable()
export class LocationProvider {
  
  public location: ILocation;

  constructor(private data: DataProvider) {
    console.log('LocationProvider');
  }

  /* changeLocation(id) method
   @param id - type from number
   An internal function finds the selected location in
   game.locationsArray[] based on id number passed as a
   parameter, then it is assigned to currentLocation */
  changeLocation(id) {
    this.location = this.data.locationsArray.find( location => location.id == id );
    console.log('New location - ' + this.location.name );
  }

  releaseItem() {
    
  }
}