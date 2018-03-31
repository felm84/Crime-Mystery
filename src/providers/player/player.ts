import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';

@Injectable()
export class PlayerProvider {

  //#region PlayerProvider PROPERTIES
  public player;
  public currentLocation;
  public inventory = {
    'items': [],
    'locations': [],
    'contacts': []
  };

  //#endregion

  /* PlayerProvider constructor
   @param data - type from DataProvider
   Data will provide all the database, such as, list of characters,
   items, locations and speeches, then loadPlayer() will be loaded. */
  constructor(private data: DataProvider) {
  }

  //#region METHODS

  /* loadPlayer() method
   Will assign the initial character and location when player 
   selects new data, then add to its list the initial location
   and an assistent */
  loadPlayer() {
    this.player = this.data.charactersArray[0];
    this.currentLocation = this.data.locationsArray[0];
    this.addLocation(this.currentLocation);
    this.addContact(this.data.charactersArray[1]);
    console.log('Player Loaded. - ' + this.currentLocation);
  }

  /* addItem(item) method
   @param item - type from interface IItem
   Adds a found item to player's itemList[]. This list is 
   displayed in the item-list.html  */
  addItem(item) {
    const found = this.inventory.items.find((element) => element.id === item.id);
    if (found === undefined) {
      this.inventory.items.push(item);
      console.log(item.name + ' - added.');
    }
  }

  /* removeItem(item) method
   @param item - type from interface IItem
   Removes the selected item from player's itemList[].
   It first identify the item index in the list then
   slice it off from. */
  removeItem(item) {
    let start = this.inventory.items.indexOf(item);
    this.inventory.items.slice(start, start + 1);
    console.log(item.name + ' - removed.')
  }

  /* addLocation(location) method
   @param location - type from interface ILocation
   Adds an unlocked location to player's locationList[]. This list is 
   displayed in the location-list.html
   It runs a find method to check if the same location already exit
   in the list, if not, it will be pushed to the list. */
  addLocation(location) {
    const found = this.inventory.locations.find((element) => element.id === location.id);
    if (found === undefined) {
      this.inventory.locations.push(location);
      console.log(location.name + ' - added.');
    }      
  }

  /* removeLocation(location) method
   @param location - type from interface ILocation
   Removes the selected location from player's locationList[].
   It first identify the location index in the list then
   slice it off from. */
  removeLocation(location) {
    let start = this.inventory.locations.indexOf(location);
    this.inventory.locations.slice(start, start + 1);
    console.log(location + ' - removed.')
  }

  /* addContact(contact) method
   @param contact - type from interface ICharacter
   Adds a visited contact to player's contactList[]. This list is 
   displayed in the contact-list.html
   It runs a find method to check if the same contact already exit
   in the list, if not, it will be pushed to the list. */
  addContact(contact) {
    const found = this.inventory.contacts.find((element) => element.id === contact.id);
    if (found === undefined) {
      this.inventory.contacts.push(contact);
      console.log(contact.name + ' - added.');
    }
  }

  /* removeContact(contact) method
   @param contact - type from interface ICharacter
   Removes the selected contact from player's contactList[].
   It first identify the contact index in the list then
   slice it off from. */
  removeContact(contact) {
    let start = this.inventory.contacts.indexOf(contact);
    this.inventory.contacts.slice(start, start + 1);
    console.log(contact.name + ' - removed.');
  }
  //#endregion

}
