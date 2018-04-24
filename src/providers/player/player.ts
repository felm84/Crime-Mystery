import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';
import { IItem } from '../interface/item';
import { LocationProvider } from '../location/location';
import { ILocation } from '../interface/location';
import { ItemProvider } from '../item/item';
import { NpcProvider } from '../npc/npc';
import { AlertProvider } from '../alert/alert';

@Injectable()
export class PlayerProvider {

  //#region PlayerProvider PROPERTIES
  private _player: ICharacter;
  private _currentLocation: ILocation;
  private _currentSpeech: ISpeech;

  //item IItem[], locations ILocation[], contacts ICharacter[]
  public inventory = {
    'items': [],
    'locations': [],
    'contacts': []
  };

  public hasWarrant: boolean = false;
  //#endregion

  constructor(
    public loadingCtrl: LoadingController,
    private _data: DataProvider,
    private _itemProvider: ItemProvider,
    private _alert: AlertProvider
  ) {
    console.log('PlayerProvider******');
  }

  //#region ENCAPSULATION
  public get player() : ICharacter {
    return this._player;
  }
  
  public set player(v : ICharacter) {
    this._player = v;
    this._currentSpeech = this._data.speechesArray[
      this._data.speechesArray.findIndex(x => x.id === 1)
    ];
    for (const location of this._data.locationsArray) {
      this.addLocation(location);
    }
  }
  
  public get currentLocation() : ILocation {
    return this._currentLocation;
  }
  
  public set currentLocation(v : ILocation) {
    this._currentLocation = v;
  }
  
  
  public get currentSpeech() : ISpeech {
    return this._currentSpeech;
  }
  
  public set currentSpeech(v : ISpeech) {
    this._currentSpeech = v;
  }
  //#endregion

  //#region METHODS

  /* answerNpc(speech)
   @param speech - type from ISpeech
   answers the npc accordingly to what npc currentSpeech is
   passed as speech parameter */
  answer(npc: NpcProvider, location: ILocation): ISpeech {
    if (location.items.length === 0) {
      this.currentSpeech = this._data.speechesArray[
        this._data.speechesArray.findIndex(x => x.id === 22)
      ];
    } else {
      this.currentSpeech = this.performFirstQuestions(npc, location)
    }
    return this.currentSpeech;
  }

  performFirstQuestions(npc: NpcProvider, location: ILocation): ISpeech {
    switch (npc.currentSpeech.id) {
      /* Good Morning!, Good Afternoon!, Good Evening!, Good Night! */
      case 1: case 2: case 3: case 4:
        this.currentSpeech = npc.currentSpeech;
        break;
      case 6: //How can I help you?
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 17)
        ];//I'm investigating a crime, have you seen anything or anyone suspicious?
        break;
      case 9: //Do you have a search warrant?
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 73)
        ];//No, but I can get one in 30 minutes!
        break;
      case 18://What sort of crime detective?
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 19)
        ];//I'm afraid I can't give any detailed about it right now.
        break;
        
      case 59://Is there anything I can do to help you?
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 7)
        ];//What do you do here?
        break;
        //65 - 71 npc job and self-description, 5-Nice to see you again, what can I do for you?
        case 5: case 65: case 66: case 67: case 68: case 69: case 70: case 71:
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 8)
        ];//Do you mind if I take a look around?
        break;
      case 64://Anytime you need!
        this._alert.presentAlert('Search Area', `Now you may search the area by selecting <b>Search 
        Area</b> in the header menu.`);
        break;
      case 72://No problem, feel free to search around!
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 63)
        ];//Thank you very much for your help.
      case 74://No problem, I'll see you next time!
        this._alert.presentAlert('Search Warrant', `Search warrant is required for this location. 
        Please, select <b>Get Warrant</b> in the header menu.`);
        break;
      default:
        break;
    }
    return this.currentSpeech;
  }

  /* removeItem(item) method
   @param item - type from interface IItem
   Removes the selected item from player's itemList[].
   It first identify the item index in the list then
   slice it off from. */
  removeItem(item: IItem) {
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
  addLocation(location: ILocation) {
    const found = this.inventory.locations.find(element => element.id === location.id);
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
  removeLocation(location: ILocation) {
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
  addContact(contact: ICharacter) {
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
  removeContact(contact: ICharacter) {
    let start = this.inventory.contacts.indexOf(contact);
    this.inventory.contacts.slice(start, start + 1);
    console.log(contact.name + ' - removed.');
  }
  //#endregion

}
