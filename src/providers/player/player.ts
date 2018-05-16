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

  //region PROPERTIES
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
  //endregion

  /**
   * PlayerProvider constructor
   * @param loadingCtrl type from LoadingController
   * @param _data type from DataProvider
   * @param _item type from ItemProvider
   * @param _alert type from AlertProvider
   */
  constructor(
    public loadingCtrl: LoadingController,
    private _data: DataProvider,
    private _item: ItemProvider,
    private _alert: AlertProvider
  ) {
    console.log('PlayerProvider******');
  }

  //region ENCAPSULATION
  public get player() : ICharacter {
    return this._player;
  }
  
  public set player(v : ICharacter) {
    this._player = v;
    this._currentSpeech = this._data.speechesArray[
      this._data.speechesArray.findIndex(x => x.id === 99)
    ]; //...
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
  //endregion

  //region METHODS

  /**
   * makeArrest() method
   * @param suspectId type from number - npc id
   * @param murdererId type from number - murderer storaged id
   * Compares the current npc id to the storaged one.
   */
  makeArrest(suspectId: number, murdererId: number): boolean {
    if (suspectId === murdererId) {
      return true;
    }
    return false;
  }
  
  /**
   * answerNpc() method
   * @param speech type from ISpeech - to use npc's speech
   * @param location type from ILocation
   * @returns type from ISpeech - value to be shown in current-location.html.
   */
  answer(npc: NpcProvider, location: ILocation): ISpeech {
      this.currentSpeech = this.performFirstApproach(npc, location)
    return this.currentSpeech;
  }

  /**
   * performFirstApproach() method
   * @param npc type from NpcProvider - to use player's speech
   * @param location type from ILocation
   * @returns type from ISpeech - value to be shown in current-location.html
   * A range of answers to be used accordingly to what npc speech passed as
   * parameter.
   */
  performFirstApproach(npc: NpcProvider, location: ILocation): ISpeech {
    if (npc.npc.id === 2) {
      this.currentSpeech = this.answerWatson(npc);
    } else {
      switch (npc.currentSpeech.id) {
        /* Good Morning!, Good Afternoon!, Good Evening!, Good Night! */
        case 1: case 2: case 3: case 4:
          this.currentSpeech = npc.currentSpeech;
          break;
        case 6://How can I help you?
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
        case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 75:
          this.currentSpeech = this._data.speechesArray[
            this._data.speechesArray.findIndex(x => x.id === 8)
          ];//Do you mind if I take a look around?
          break;
        case 64://Anytime you need! - CALL ALERT
          this.currentSpeech = this._data.speechesArray[
            this._data.speechesArray.findIndex(x => x.id === 100)
          ];//Empty ''
          this._alert.presentAlert('Search Area', `You may search the area by selecting <b>Search 
          Area</b> in the header menu.`);
          break;
        case 72://No problem, feel free to search around!
          this.currentSpeech = this._data.speechesArray[
            this._data.speechesArray.findIndex(x => x.id === 63)
          ];//Thank you very much for your help.
          break;
        case 74://No problem, I'll see you next time! NPC wants search warrant - CALL ALERT
          this.currentSpeech = this._data.speechesArray[
            this._data.speechesArray.findIndex(x => x.id === 100)
          ];//Empty ''
          this._alert.presentAlert('Get Warrant', `Search warrant is required for this location. 
          Please, select <b>Get Warrant</b> in the header menu.`);
          break;
        default:
          this.currentSpeech = this.performSecondApproach(npc, location);
          break;
      }
    }
    return this.currentSpeech;
  }

  /**
   * performSecondApproach() method
   * @param npc type from NpcProvider - to use player's speech
   * @param location type from ILocation
   * @returns type from ISpeech - value to be shown in current-location.html
   * A range of answers to be used accordingly to what npc speech passed as
   * parameter.
   */
  performSecondApproach(npc: NpcProvider, location: ILocation): ISpeech {
    switch (npc.currentSpeech.id) {
      case 5: //Nice to see you again, what can I do for you?
        if (location.items.length > 0) {
          this.currentSpeech = this._data.speechesArray[
            this._data.speechesArray.findIndex(x => x.id === 8)
          ];//Do you mind if I take a look around?
        } else {
          this.currentSpeech = this._data.speechesArray[
            this._data.speechesArray.findIndex(x => x.id === 22)
          ];//I found some items in this place, they may help me to catch the suspect!
        }
        break;
      default: // Last option each location - CALL ALERT
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 100)
        ];//Empty ''
        this._alert.presentAlert('Set Location', `Please, set another location in the <b>Map Tab</b> 
        to continue the investigation.`);
        break;
    }
    return this.currentSpeech;
  }

  /**
   * answerWatson() method
   * @param npc type from NpcProvider - to use player's speech
   * @returns type from ISpeech - value to be shown in current-location.html
   * A range of answers to be used accordingly to what npc speech passed as
   * parameter.
   */
  answerWatson(npc: NpcProvider): ISpeech {
    switch (npc.currentSpeech.id) {
      /* Good Morning!, Good Afternoon!, Good Evening!, Good Night! */
      case 1: case 2: case 3: case 4:
        this.currentSpeech = npc.currentSpeech;
        break;
      case 5: //Nice to see you again, what can I do for you?
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 16)
        ]; //Do you have any News about our investigation?
        break;
      case 21:
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 78)
        ]; //Yes, I'm aware of that, we need to start this investigation as soon as possible!
        break;
      case 79:/* Right! First we need to select a location, 
      talk to the local and search the area for some evidences. */
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 80)
        ]; //Fine, lets get this started!
        break;
      default: // Last option each location - CALL ALERT
        this.currentSpeech = this._data.speechesArray[
          this._data.speechesArray.findIndex(x => x.id === 100)
        ];//Empty ''
        this._alert.presentAlert('Set Location', `Please, set another location in the <b>Map Tab</b> 
        to continue the investigation.`);
        break;
    }
    return this.currentSpeech;
  }

  /**
   * removeItem() method
   * @param item type from interface IItem
   * Removes the selected item from player's itemList[].
   * It first identify the item index in the list then 
   * slice it off from.
   */
  removeItem(item: IItem) {
    let start = this.inventory.items.indexOf(item);
    this.inventory.items.slice(start, start + 1);
  }

  /**
   * addLocation() method
   * @param location type from interface ILocation
   * Adds an unlocked location to player's locationList[]. This list is
   * displayed in the location-list.html.
   * It runs a find method to check if the same location already exit
   * in the list, if not, it will be pushed to the list.
   */
  addLocation(location: ILocation) {
    const found = this.inventory.locations.find(element => element.id === location.id);
    if (found === undefined) {
      this.inventory.locations.push(location);
    }      
  }

  /**
   * removeLocation() method
   * @param location type from interface ILocation
   * Removes the selected location from player's locationList[].
   * It first identify the location index in the list then 
   * slice it off from.
   */
  removeLocation(location: ILocation) {
    let start = this.inventory.locations.indexOf(location);
    this.inventory.locations.slice(start, start + 1);
    console.log(location + ' - removed.')
  }

  /**
   * addContact(contact) method
   * @param contact type from interface ICharacter
   * Adds a visited contact to player's contactList[]. This list is 
   * displayed in the contact-list.html. 
   * It runs a find method to check if the same contact already exit 
   * in the list, if not, it will be pushed to the list.
   */
  addContact(contact: ICharacter) {
    const found = this.inventory.contacts.find((element) => element.id === contact.id);
    if (found === undefined) {
      this.inventory.contacts.push(contact);
      console.log(contact.name + ' - added.');
    }
  }

  /**
   * removeContact() method
   * @param contact - type from interface ICharacter
   * Removes the selected contact from player's contactList[].
   * It first identify the contact index in the list then 
   * slice it off from.
   */
  removeContact(contact: ICharacter) {
    let start = this.inventory.contacts.indexOf(contact);
    this.inventory.contacts.slice(start, start + 1);
    console.log(contact.name + ' - removed.');
  }
  //endregion

}
