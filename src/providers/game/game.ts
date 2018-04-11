import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';
import { NpcProvider } from '../npc/npc';

@Injectable()
export class GameProvider {

  /* GameProvider constructor
   @param data - type from DataProvider
   @param locationPvd - type from LocationProvider
   @param npcPvd - type from NpcProvider
   @param playerPvd - type from PlayerProvider
   data provides all Characters, Items, Locations and Speeches when the app
   was opened.
   locationPvd, npcPvd, playerPvd provide all their methods and properties to be used in the app
   through the GameProvider. */
  constructor(
    public data: DataProvider,
    public locationPvd: LocationProvider,
    public npcPvd: NpcProvider,
    public playerPvd: PlayerProvider
  ) {
    console.log('Hello GameProvider Provider');
  }

  /* loadNewGame() method
   Assigns initial location, npc accordingly to location, player, 
   and player's first response, add the initial location and contact
   into player's inventory location and contact */
  loadNewGame() {
    this.locationPvd.location = this.data.locationsArray[0]; //Detective's office
    this.npcPvd.npc = this.npcPvd.findNpc(this.locationPvd.location.npc);
    
    this.playerPvd.player = this.data.charactersArray[0]; //Sherlock Holmes
    this.playerPvd.currentSpeech = this.npcPvd.currentSpeech;

    this.playerPvd.addLocation(this.locationPvd.location);
    this.playerPvd.addLocation(this.data.locationsArray[1]);

    this.playerPvd.addContact(this.npcPvd.npc);

    //TODO - delete once is tested
    console.log(this.playerPvd);
    console.log(this.npcPvd);
    console.log(this.locationPvd);
  }

  // Get data form localstorage
  loadContinueGame() {

  }

  /* changeLocation(location) method
   @param location - type from interface ILocation
   location will be assigned to location property in LocationProvider
   and location.npc to setNpc in NpcProvider, then the new
   npc can be added into PlayerProvider invetory contacts list. */
  changeLocation(location) {
    this.locationPvd.location = location;
    this.npcPvd.npc = this.npcPvd.findNpc(location.npc);
    this.playerPvd.addContact(this.npcPvd.npc);

    //TODO - delete once is tested
    console.log(this.locationPvd);
    console.log(this.npcPvd);
  }
}
