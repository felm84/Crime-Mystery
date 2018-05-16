import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PlayerProvider } from '../player/player';
import { ItemProvider } from '../item/item';
import { GameProvider } from '../game/game';

@Injectable()
export class SaveProvider {

  public saveKey: string = 'game';
  private _saveValue: any = {
    /* Save player property, 
    - get list of locations from this._playerProvider.hasWarrant */
    has_warrant: false,
    /* Save Locations, 
    - get list of locations from this._playerProvider.inventory.locations */
    locations: [],
    /* Save Npcs, 
    - get list of contacts from this._playerProvider.inventory.contacts */
    npcs: [], 
    items: {
      collected: [], //[] = this.itemProvider.collectedItems[x]
      analysing: [], //[] = this.itemProvider.analysingItems[x]
      ready: [] //[] = this.itemProvider.itemsReady[x]
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

  /**
   * startNewGame() method
   * @returns type from Promise<any>
   * Assigns initial location, npc accordingly to location, player, 
   * and player's first response, add the initial location and contact 
   * into player's inventory location and contact.
   */
  startNewGame(): Promise<any> {
    return new Promise((resolve) => {
      this._game.locationProvider.location = this._game.data.locationsArray[0]; //Detective's office
      this._game.npcProvider.npc  = this._game.npcProvider.findNpc(this._game.locationProvider.location.npc);
      this._game.playerProvider.player = this._game.data.charactersArray[0]; //Sherlock Holmes
      this._game.playerProvider.currentLocation = this._game.data.locationsArray[0];
      this._game.playerProvider.addContact(this._game.npcProvider.npc);
      for (const location of this._game.data.locationsArray) {
        this._game.playerProvider.addLocation(location);
      }
      this.storage.set('murderer', this._game.setMurderer());
      resolve();
    });
  }

  /**
   * saveGame() method
   * Assigns all values to _saveValue object according its keys, 
   * then storages it in the mobile sqlite in stringify format 
   */
  saveGame() {
    this._saveValue = {
      has_warrant: this._game.playerProvider.hasWarrant,
      locations: this._game.playerProvider.inventory.locations,
      npcs: this._game.playerProvider.inventory.contacts,
      items: {
        collected: this._game.itemProvider.collectedItems,
        analysing: this._game.itemProvider.analysingItems,
        ready: this._game.itemProvider.itemsReady
      }
    };

    this.storage.set(this.saveKey, this._saveValue)
    .then(() => console.log('*****Game Saved*****'));    
  }

  /**
   * loadGame() method
   * @param savedGame type from object - JSON.parse(stringify value)
   * Receives an object JSON format value and assigns all object's values
   * to their specific location in the game. 
   */
  loadGame(savedGame: object) {
    if (savedGame) {
      this._saveValue = savedGame;

      this._game.locationProvider.location = this._game.data.locationsArray[0]; //Detective's office
      this._game.npcProvider.npc  = this._game.npcProvider.findNpc(this._game.locationProvider.location.npc);
      this._game.playerProvider.player = this._game.data.charactersArray[0]; //Sherlock Holmes
      this._game.playerProvider.currentLocation = this._game.data.locationsArray[0];
      
      this._game.playerProvider.hasWarrant = this._saveValue.has_warrant;
      this._game.playerProvider.inventory.locations = this._saveValue.locations;
      this._game.playerProvider.inventory.contacts = this._saveValue.npcs;

      this._game.itemProvider.collectedItems = this._saveValue.items.collected;
      this._game.itemProvider.itemsReady = this._saveValue.items.ready;

      for (const location of this._saveValue.locations) {
        this._game.playerProvider.addLocation(location);
      }

      for (const item of this._saveValue.items.analysing) {
        this._game.itemProvider.analyseItem(item.item, item.finish)
      }
      console.log('*****Game Loaded*****');
    }
  }

<<<<<<< HEAD
  /**
   * clearGmame() method
   * Clears the local storage data, then clears all the required
   * providers to start a new game.
   */
=======
>>>>>>> 562d8eceba0801f012fabc069a7442855dbfdefb
  clearGame() {
    this.storage.clear()
    .then(() => {
      this._game.data.loadContent();
      this._game.itemProvider.collectedItems = [];
      this._game.itemProvider.analysingItems = [];
      this._game.itemProvider.itemsReady = [];
      this._game.playerProvider.hasWarrant = false;
      this._game.playerProvider.inventory.contacts = [];
      this._game.playerProvider.inventory.items = [];
      this._game.playerProvider.inventory.locations = [];
    }).then(() => console.log(`****Game Cleared****`));
  }
}
