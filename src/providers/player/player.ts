import { Injectable } from '@angular/core';
import { GameProvider } from '../game/game';

@Injectable()
export class PlayerProvider {

  public playerName;
  public currentLocation;
  public itemList = [];
  public locationList = [];
  public contactList = [];

  // Running tests
  constructor(private game: GameProvider) {
    this.playerName = game.charactersArray[0].name;
    this.currentLocation = game.locationsArray[0];
    this.itemList = game.itemsArray;
    this.addLocation(game.locationsArray[2]);
    this.contactList = game.charactersArray;
    console.log('Player Loaded.');
  }

  loadPlayer() {

  }

  addItem(item) {
    this.itemList.push(item);
    console.log(item + 'added.');
  }

  removeItem(item) {
    let start = this.itemList.indexOf(item);
    this.itemList.slice(start, start + 1);
    console.log(item + 'removed.')
  }

  addLocation(location) {
    this.locationList.push(location);
    console.log(location + 'added.');
  }

  removeLocation(location) {
    let start = this.locationList.indexOf(location);
    this.locationList.slice(start, start + 1);
    console.log(location + 'removed.')
  }

  addContact(contact) {
    this.contactList.push(contact);
    console.log(contact + 'added.');
  }

  removeContact(contact) {
    let start = this.contactList.indexOf(contact);
    this.contactList.slice(start, start + 1);
    console.log(contact + 'removed.');
  }

}
