import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';
import { NpcProvider } from '../npc/npc';
import { ItemProvider } from '../item/item';
import { SaveProvider } from '../save/save';

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
    private _save: SaveProvider,
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
  startNewGame() {
    this.locationProvider.location = this.data.locationsArray[0]; //Detective's office
    this.npcProvider.npc  = this.npcProvider.findNpc(this.locationProvider.location.npc);
    this.playerProvider.player = this.data.charactersArray[0]; //Sherlock Holmes
    this.playerProvider.currentLocation = this.data.locationsArray[0];
    this.playerProvider.addContact(this.npcProvider.npc);
  }

  // Get data form localstorage
  loadContinueGame() {
    this._save.storage.get(this._save.saveKey)
    .then(val => this.setGame(JSON.parse(val)))
    .then(() => this.saveGame());
  }

  setGame(savedGame: object) {
    if (savedGame) {
      this._save.saveValue = savedGame;

      this.locationProvider.location = this.data.locationsArray[0]; //Detective's office
      this.npcProvider.npc  = this.npcProvider.findNpc(this.locationProvider.location.npc);
      this.playerProvider.player = this.data.charactersArray[0]; //Sherlock Holmes
      this.playerProvider.currentLocation = this.data.locationsArray[0];
      
      this.playerProvider.hasWarrant = this._save.saveValue.has_warrant;
      this.playerProvider.inventory.locations = this._save.saveValue.location;
      this.playerProvider.inventory.contacts = this._save.saveValue.npc;

      this.itemProvider.collectedItems = this._save.saveValue.items.collected;
      this.itemProvider.itemsReady = this._save.saveValue.items.ready;

      for (const item of this._save.saveValue.items.analysing) {
        this.itemProvider.analyseItem(item.item, item.finish)
      }
      console.log('*****Game Loaded*****');
    }
  }
  // Save data in locastorage
  saveGame() {
    this._save.saveValue = {
      has_warrant: this.playerProvider.hasWarrant,
      location: this.playerProvider.inventory.locations,
      npc: this.playerProvider.inventory.contacts,
      items: {
        collected: this.itemProvider.collectedItems,
        analysing: this.itemProvider.analysingItems,
        ready: this.itemProvider.itemsReady
      }
    };

    this._save.storage.set(this._save.saveKey, JSON.stringify(this._save.saveValue))
    .then(() => this._save.storage.get(this._save.saveKey))
    .then(() => console.log('*****Game Saved*****'));
  }


}
