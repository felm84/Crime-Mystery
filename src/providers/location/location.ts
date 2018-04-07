import { Injectable } from '@angular/core';

import { ILocation } from '../interface/location';
import { IItem } from '../interface/item';
import { DataProvider } from '../data/data';

@Injectable()
export class LocationProvider {
  
  private _location: ILocation;

  private _items: IItem[] = [];

  constructor(private data: DataProvider) {
    console.log('LocationProvider');
  }

  //#region ENCAPSULATION
  
  public get location() : ILocation {
    return this._location;
  }
  
  public set location(v : ILocation) {
    this._location = v;
    this.feedItemsList();
  }
  
  public get items() : IItem[] {
    return this._items;
  }
  
  public set items(v : IItem[]) {
    this._items = v;
  }
    
  //#endregion

  /* changeLocation(id) method
   @param id - type from number
   An internal function finds the selected location in
   game.locationsArray[] based on id number passed as a
   parameter, then it is assigned to currentLocation */
  setLocation(location) {
    this.location = location
    console.log('New location - ' + this.location.name );
  }

  findItem(id: number): IItem {
    return this.data.itemsArray[
      this.data.itemsArray.findIndex(location => location.id === id)
    ];
  }

  feedItemsList() {
    let value: IItem[] = [];
    for (const item of this.location.items) {
      value.push(this.findItem(item));
    }
    this.items = value;
  }

  releaseItem() {
    this.location.items.pop();
  }
}