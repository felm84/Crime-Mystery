import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';
import { NpcProvider } from '../npc/npc';
import { ItemProvider } from '../item/item';

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
    public locationProvider: LocationProvider,
    public npcProvider: NpcProvider,
    public playerProvider: PlayerProvider,
    public itemProvider: ItemProvider
  ) {
    console.log('GameProvider******');
  }

  /* loadNewGame() method
   Assigns initial location, npc accordingly to location, player, 
   and player's first response, add the initial location and contact
   into player's inventory location and contact */
  loadNewGame() {
    this.locationProvider.location = this.data.locationsArray[0]; //Detective's office
    this.npcProvider.npc  = this.npcProvider.findNpc(this.locationProvider.location.npc);
    this.playerProvider.player = this.data.charactersArray[0]; //Sherlock Holmes
    this.playerProvider.addContact(this.npcProvider.npc);
    //TODO - delete once is tested
    console.log(this.playerProvider);
    console.log(this.npcProvider);
    console.log(this.locationProvider);
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
    this.locationProvider.location = location;
    this.npcProvider.npc = this.npcProvider.findNpc(location.npc);
    this.playerProvider.addContact(this.npcProvider.npc);

    //TODO - delete once is tested
    console.log(this.locationProvider);
    console.log(this.npcProvider);
  }
}
