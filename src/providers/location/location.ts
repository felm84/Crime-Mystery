import { Injectable } from '@angular/core';

import { ILocation } from '../interface/location';
import { IItem } from '../interface/item';
import { DataProvider } from '../data/data';

@Injectable()
export class LocationProvider {
  
  private _location: ILocation;
  private _items: IItem[] = [];

  /* LocationProvider constructor
   @param data - type from DataProvider
   data will be needed to access itemsArray[] and locationArray[] properties */
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

  //#region METHODS

  /* findItem(id): IItem method
   @param id - type from number
   searches for the index number that has the same location id
   as the id passed as a parameter, then it returns an IItem */
  findItem(id: number): IItem {
    return this.data.itemsArray[
      this.data.itemsArray.findIndex(location => location.id === id)
    ];
  }

  /* feedItemsList() method
   runs a loop in location.items, finds each item, then pushes it
   into a temp value[] variable to be assigned in items[] property */
  feedItemsList() {
    let value: IItem[] = [];
    for (const item of this.location.items) {
      value.push(this.findItem(item));
    }
    this.items = value;
  }

  /* releaseItem() method
   removes the first item in the location.items list. */
  releaseItem() {
    this.location.items.shift();
    this.data.locationsArray[
      this.data.locationsArray.findIndex(x => x.id === this._location.id)
    ].items.shift();
  }
  //#endregion
}