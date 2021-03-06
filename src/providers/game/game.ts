import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';
import { NpcProvider } from '../npc/npc';
import { ItemProvider } from '../item/item';

@Injectable()
export class GameProvider {

  /**
   * GameProvider constructor
   * @param data type from DataProvider
   * @param locationProvider type from LocationProvider
   * @param npcProvider type from NpcProvider
   * @param playerProvider type from PlayerProvider
   * @param itemProvider type from ItemProvider
   * All parameter injected into the DataProvider class, so they can be
   * used in the methods and properties.
   */
  constructor(
    public data: DataProvider,
    public locationProvider: LocationProvider,
    public npcProvider: NpcProvider,
    public playerProvider: PlayerProvider,
    public itemProvider: ItemProvider
  ) {
    console.log('GameProvider******');
  }

  /**
   * setMurderer() method
   * @returns type from number - npc id
   * Randomly assigns a murder to the game when a new game is started.
   */
  setMurderer(): number {
    let max = this.data.charactersArray.length;
    let min = 3;
    let index = Math.floor(Math.random() * (max - min) + min);
    return this.data.charactersArray[index].id;
  }
}
