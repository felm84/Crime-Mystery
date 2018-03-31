import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { NpcProvider } from '../npc/npc';


@Injectable()
export class LocationProvider {

  public location = this.data.locationsArray[0];
  public nonPlayer; //Get player accordingly to current location selected
  public itemList = []; //Get item list accordingly to current location selected
  public visited = false; //Changes when player visit the location

  constructor(
    private data: DataProvider, 
    private npc: NpcProvider
  ) { console.log('Hello LocationProvider Provider'); }

  /* changeLocation(id) method
   @param id - type from number
   An internal function finds the selected location in
   game.locationsArray[] based on id number passed as a
   parameter, then it is assigned to currentLocation */
  changeLocation(id) {
    this.location = this.data.locationsArray.find(
      (location) => location.id == id);
    console.log('New location - ' + this.location.name);
  }
}