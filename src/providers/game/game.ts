import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';
import { NpcProvider } from '../npc/npc';

@Injectable()
export class GameProvider {

  constructor(
    public location: LocationProvider,
    public npc: NpcProvider,
    public player: PlayerProvider,
    public data: DataProvider
  ) { 
    console.log('Hello GameProvider Provider');
    this.loadNewGame();    
  }

  loadNewGame() {
    this.location.location = this.data.locationsArray[0]; //Detective's office
    this.player.player = this.data.charactersArray[0]; //Sherlock Holmes
    this.npc.npc = this.data.charactersArray[
      this.npc.findNpc(this.location.location.npc)
    ]; //Dr. Watson
    this.player.addLocation(this.location.location);
    this.player.addContact(this.npc.npc);
    for (const item of this.location.location.items) {
      this.player.addItem(this.data.itemsArray[this.findElement(item)]);
      console.log(this.data.itemsArray[this.findElement(item)]);
    }
  }

  findElement(id) {
    let index = this.data.itemsArray.findIndex((element) => element.id === id);
    return index;
  }

  // Get data form localstorage
  loadContinueGame() {

  }
}
