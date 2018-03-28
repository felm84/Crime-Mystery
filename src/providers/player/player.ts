import { Injectable } from '@angular/core';
import { GameProvider } from '../game/game';
import { LocationProvider } from '../location/location';

@Injectable()
export class PlayerProvider {

  //#region PlayerProvider PROPERTIES
  public player;
  public currentLocation;
  public itemList = [];
  public locationList = [];
  public contactList = [];
  //#endregion

  /* PlayerProvider constructor
   @param game - type from GameProvider
   Game will provide all the database, such as, list of characters,
   items, locations and speeches, then loadPlayer() will be loaded. */
  constructor(
    private game: GameProvider,
    private location: LocationProvider
  ) {
    this.loadPlayer();
  }

  //#region METHODS

  /* loadPlayer() method
   Will assign the initial character and location when player 
   selects new game, then add to its list the initial location
   and an assistent */
  loadPlayer() {
    this.player = this.game.charactersArray[0];
    this.currentLocation = this.location.location;
    this.addLocation(this.currentLocation);
    this.addContact(this.game.charactersArray[1]);
    console.log('Player Loaded. - ' + this.currentLocation);
  }

  /* addItem(item) method
   @param item - type from interface IItem
   Adds a found item to player's itemList[]. This list is 
   displayed in the item-list.html  */
  addItem(item) {
    this.itemList.push(item);
    console.log(item + ' added.');
  }

  /* removeItem(item) method
   @param item - type from interface IItem
   Removes the selected item from player's itemList[].
   It first identify the item index in the list then
   slice it off from. */
  removeItem(item) {
    let start = this.itemList.indexOf(item);
    this.itemList.slice(start, start + 1);
    console.log(item + ' removed.')
  }

  /* addLocation(location) method
   @param location - type from interface ILocation
   Adds a unlocked location to player's locationList[]. This list is 
   displayed in the location-list.html  */
  addLocation(location) {
    this.locationList.push(location);
    console.log(location + ' added.');
  }

  /* removeLocation(location) method
   @param location - type from interface ILocation
   Removes the selected location from player's locationList[].
   It first identify the location index in the list then
   slice it off from. */
  removeLocation(location) {
    let start = this.locationList.indexOf(location);
    this.locationList.slice(start, start + 1);
    console.log(location + ' removed.')
  }

  /* addContact(contact) method
   @param contact - type from interface ICharacter
   Adds a visited contact to player's contactList[]. This list is 
   displayed in the contact-list.html  */
  addContact(contact) {
    this.contactList.push(contact);
    console.log(contact + ' added.');
  }

  /* removeContact(contact) method
   @param contact - type from interface ICharacter
   Removes the selected contact from player's contactList[].
   It first identify the contact index in the list then
   slice it off from. */
  removeContact(contact) {
    let start = this.contactList.indexOf(contact);
    this.contactList.slice(start, start + 1);
    console.log(contact + ' removed.');
  }
  //#endregion

}
