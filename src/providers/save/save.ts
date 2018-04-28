import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PlayerProvider } from '../player/player';
import { ItemProvider } from '../item/item';

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

  constructor(
    public storage: Storage,
  ) {
    console.log('Hello SaveProvider Provider');
  }
}
