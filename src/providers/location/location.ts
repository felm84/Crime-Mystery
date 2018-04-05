import { Injectable } from '@angular/core';

import { ILocation } from '../interface/location';
import { IItem } from '../interface/item';
import { DataProvider } from '../data/data';

@Injectable()
export class LocationProvider {
  
  public location: ILocation;

  public items: IItem[] = [];

  constructor(private data: DataProvider) {
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

  findIndex(id) {
    let index = this.data.itemsArray.findIndex((element) => element.id === id);
    return index;
  }

  feedList() {
    for (const item of this.location.items) {
      this.items.push(this.data.itemsArray[this.findIndex(item)]);
      console.log(this.data.itemsArray[this.findIndex(item)]);
    }
  }

  releaseItem() {
    this.location.items.pop();
  }
}