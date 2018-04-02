import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';

@Injectable()
export class GameProvider {

  constructor(
    public location: LocationProvider,
    public player: PlayerProvider,
    public data: DataProvider
  ) { 
    console.log('Hello GameProvider Provider');
    this.loadNewGame();    
  }

  loadNewGame() {
    this.location.location = this.data.locationsArray[0];
    this.player.player = this.data.charactersArray[0]; //Sherlock Holmes
    this.location.npc = this.data.charactersArray[
      this.findElement(this.location.location.npc)
    ]; //Dr. Watson
    this.player.addLocation(this.location.location);
    this.player.addContact(this.location.npc);
    for (const item of this.location.location.items) {
      this.player.addItem(this.data.itemsArray[this.findElement(item)]);
      console.log(this.data.itemsArray[this.findElement(item)]);
    }
    //this.player.addItem(this.data.itemsArray[this.findElement(2)]);
    //console.log(this.findElement(2));
  }

  findElement(id) {
    let index = this.data.itemsArray.findIndex((element) => element.id === id);
    return index;
  }

  // Get data form localstorage
  loadContinueGame() {

  }
}
