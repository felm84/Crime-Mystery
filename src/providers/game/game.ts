import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';
import { NpcProvider } from '../npc/npc';

@Injectable()
export class GameProvider {

  constructor(
    public data: DataProvider,
    public locationPvd: LocationProvider,
    public npcPvd: NpcProvider,
    public playerPvd: PlayerProvider
  ) {
    console.log('Hello GameProvider Provider');
  }

  loadNewGame() {
    this.locationPvd.location = this.data.locationsArray[0]; //Detective's office
    
    this.playerPvd.player = this.data.charactersArray[0]; //Sherlock Holmes

    this.npcPvd.npc = this.npcPvd.findNpc(this.locationPvd.location.npc);

    this.playerPvd.addLocation(this.locationPvd.location);
    this.playerPvd.addLocation(this.data.locationsArray[1]);

    this.playerPvd.addContact(this.npcPvd.npc);

    console.log(this.playerPvd);
    console.log(this.npcPvd);
    console.log(this.locationPvd);
  }

  // Get data form localstorage
  loadContinueGame() {

  }

  /* changeLocation(location) method
   @param location - type from interface ILocation
   location will be used to setLocation in LocationProvider
   and location.npc to setNpc in NpcProvider, then the new
   npc can be added into PlayerProvider invetory contacts list. */
  changeLocation(location) {
    this.locationPvd.location = location;
    this.npcPvd.npc = this.npcPvd.findNpc(location.npc);
    this.playerPvd.addContact(this.npcPvd.npc);
    console.log(this.locationPvd);
    console.log(this.npcPvd);
  }
}
