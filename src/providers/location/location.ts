import { Injectable } from '@angular/core';
import { ILocation } from '../interface/location';

@Injectable()
export class LocationProvider {
  
  public location: ILocation;

  constructor() {
    console.log('LocationProvider');
  }

  /* changeLocation(id) method
   @param id - type from number
   An internal function finds the selected location in
   game.locationsArray[] based on id number passed as a
   parameter, then it is assigned to currentLocation */
  setLocation(location) {
    this.location = location
    console.log('New location - ' + this.location.name );
  }

  releaseItem() {
    this.location.items.pop();
  }
}