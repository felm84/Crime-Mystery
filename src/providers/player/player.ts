import { Injectable } from '@angular/core';
import { GameProvider } from '../game/game';

@Injectable()
export class PlayerProvider {

  public playerName;
  public currentLocation;
  public itemList = [];
  public locationList = [];
  public contactList = [];

  constructor(private game: GameProvider) {
    this.playerName = game.charactersArray[0].name;
    this.currentLocation = game.locationsArray[0];
    this.itemList = game.itemsArray;
    console.log('Player Loaded.');
  }

  loadPlayer() {

  }

  addItem() {}

  removeItem() {}

  addLocation() {}

  removeLocation() {}

  addContact() {}

  removeContact() {}

}
