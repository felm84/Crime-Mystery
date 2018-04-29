import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PlayerProvider } from '../player/player';
import { ItemProvider } from '../item/item';
import { GameProvider } from '../game/game';

@Injectable()
export class SaveProvider {

  public saveKey: string = 'game';
  public saveValue: any = {
    /* Save player property, 
    - get list of locations from this._playerProvider.hasWarrant */
    'has_warrant': false,
    /* Save Locations, 
    - get list of locations from this._playerProvider.inventory.locations */
    'locations': [],
    /* Save Npcs, 
    - get list of contacts from this._playerProvider.inventory.contacts */
    'npc': [], 
    'items': {
      'collected': [], //[] = this.itemProvider.collectedItems[x]
      'analysing': [], //[] = this.itemProvider.analysingItems[x]
      'ready': [] //[] = this.itemProvider.itemsReady[x]
    }
  }

  /**
   * SaveProvider constructor
   * @param storage type from Storage
   * @param _game type from GameProvider
   * All parameter injected into the SaveProvider class, so they can be
   * used in the methods and properties.
   */
  constructor(
    public storage: Storage,
    private _game: GameProvider
  ) {console.log('SaveProvider******');}

  /* loadNewGame() method
   Assigns initial location, npc accordingly to location, player, 
   and player's first response, add the initial location and contact
   into player's inventory location and contact */
  startNewGame() {
    this._game.locationProvider.location = this._game.data.locationsArray[0]; //Detective's office
    this._game.npcProvider.npc  = this._game.npcProvider.findNpc(this._game.locationProvider.location.npc);
    this._game.playerProvider.player = this._game.data.charactersArray[0]; //Sherlock Holmes
    this._game.playerProvider.currentLocation = this._game.data.locationsArray[0];
    this._game.playerProvider.addContact(this._game.npcProvider.npc);
    this.saveGame();
  }

  // Save data in locastorage
  saveGame() {
    this.saveValue = {
      has_warrant: this._game.playerProvider.hasWarrant,
      location: this._game.playerProvider.inventory.locations,
      npc: this._game.playerProvider.inventory.contacts,
      items: {
        collected: this._game.itemProvider.collectedItems,
        analysing: this._game.itemProvider.analysingItems,
        ready: this._game.itemProvider.itemsReady
      }
    };

    this.storage.set(this.saveKey, JSON.stringify(this.saveValue))
    .then(() => this.storage.get(this.saveKey))
    .then(() => console.log('*****Game Saved*****'));
  }

  loadGame(savedGame: object) {
    if (savedGame) {
      this.saveValue = savedGame;

      this._game.locationProvider.location = this._game.data.locationsArray[0]; //Detective's office
      this._game.npcProvider.npc  = this._game.npcProvider.findNpc(this._game.locationProvider.location.npc);
      this._game.playerProvider.player = this._game.data.charactersArray[0]; //Sherlock Holmes
      this._game.playerProvider.currentLocation = this._game.data.locationsArray[0];
      
      this._game.playerProvider.hasWarrant = this.saveValue.has_warrant;
      this._game.playerProvider.inventory.locations = this.saveValue.location;
      this._game.playerProvider.inventory.contacts = this.saveValue.npc;

      this._game.itemProvider.collectedItems = this.saveValue.items.collected;
      this._game.itemProvider.itemsReady = this.saveValue.items.ready;

      for (const item of this.saveValue.items.analysing) {
        this._game.itemProvider.analyseItem(item.item, item.finish)
      }
      console.log('*****Game Loaded*****');
    }
  }
}
