import { Injectable } from '@angular/core';
import { GameProvider } from '../game/game';


@Injectable()
export class LocationProvider {

  public location;

  constructor(private game: GameProvider) {
    // this.test().then((location) => this.location = location);
    this.location = this.game.locationsArray[2];
    console.log('LocationProvider loaded');
  }

  /* changeLocation(id) method
   @param id - type from number
   An internal function finds the selected location in
   game.locationsArray[] based on id number passed as a
   parameter, then it is assigned to currentLocation */
  changeLocation(id) {
    this.location = this.game.locationsArray.find(
      (location) => location.id == id);
    console.log('New location - ' + this.location);
  }
}
