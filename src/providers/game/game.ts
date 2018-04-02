import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { NpcProvider } from '../npc/npc';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';

@Injectable()
export class GameProvider {

  constructor(
    public location: LocationProvider,
    public player: PlayerProvider,
    public npc: NpcProvider,
    public data: DataProvider
  ) { 
    console.log('Hello GameProvider Provider');
    this.loadNewGame();    
  }

  loadNewGame() {
    this.player.player = this.data.charactersArray[0]; //Sherlock Holmes
    this.npc.npc = this.data.charactersArray[1]; //Dr. Watson
    this.location.location = this.data.locationsArray[0];
    this.player.addLocation(this.location.location);
    this.player.addContact(this.npc.npc);
  }

  // Get data form localstorage
  loadContinueGame() {

  }
}
