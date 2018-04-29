import { Injectable } from '@angular/core';
import { ILocation } from '../interface/location';
import { IItem } from '../interface/item';
import { DataProvider } from '../data/data';
import { ItemProvider } from '../item/item';

@Injectable()
export class LocationProvider {
  
  //region PROPERTIES
  private _location: ILocation;
  private _items: IItem[] = [];
  //endregion

  /**
   * LocationProvider constructor
   * @param _data type from DataProvider
   * All parameter injected into the LocationProvider class, so they can be
   * used in the methods and properties.
   */
  constructor(
    private _data: DataProvider,
  ) {console.log('LocationProvider******');}

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

  /**
   * findItem(id): IItem method
   * @param id type from number - location id
   * @returns type from IItem
   * Searches for the index number that has the same location id
   * of parameter's id, then it returns an IItem.
   */
  findItem(id: number): IItem {
    return this._data.itemsArray[
      this._data.itemsArray.findIndex(location => location.id === id)
    ];
  }

  /**
   * feedItemsList() method
   * Runs a loop in location.items, finds each item, then pushes it 
   * into a temp value[] variable to be assigned in items[] propert.
   */
  feedItemsList() {
    let value: IItem[] = [];
    for (const item of this.location.items) {
      value.push(this.findItem(item));
    }
    this.items = value;
  }

  /**
   * releaseItem() method
   * @returns type from IItem - all items from items[] property
   * Empty all currently location items[], so it cannot load them again. 
   */
  releaseItems(): IItem[] {
    let tempArray = this._items;
    this._items = [];
    this.location.items = [];
    this._data.locationsArray[
      this._data.locationsArray.findIndex(x => x.id === this._location.id)
    ].items = [];
    return tempArray;
  }
  //#endregion
}