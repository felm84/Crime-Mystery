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
}
