import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';
import { ILocation } from '../interface/location';
import { PlayerProvider } from '../player/player';
import { ItemProvider } from '../item/item';

@Injectable()
export class NpcProvider {
  
  //region PROPERTIES
  private _npc: ICharacter;
  private _speeches: ISpeech[] = [];
  private _currentSpeech: ISpeech;
  private _greeted: boolean;
  public canSearch: boolean = false;
  //endregion

  /**
   * NpcProvider constructor
   * @param _data type from DataProvider
   * @param _item type from ItemProvider
   * All parameter injected into the NpcProvider class, so they can be
   * used in the methods and properties.
   */
  constructor(
    private _data: DataProvider,
    private _item: ItemProvider
  ) {
    console.log('NpcProvider******');
  }

  //region ENCAPSULATION 
  public get npc() : ICharacter {
    return this._npc;
  }
  
  public set npc(v : ICharacter) {
    this._npc = v;
    this.feedSpeechesList();
    this._greeted = false;
    this.canSearch = false;
    this._currentSpeech = this.greetPlayer();
  }
  
  public get speeches() : ISpeech[] {
    return this._speeches;
  }
  
  
  public set speeches(v : ISpeech[]) {
    this._speeches = v;
  }
  
  public get currentSpeech() : ISpeech {
    return this._currentSpeech;
  }
   
  public set currentSpeech(v : ISpeech) {
    this._currentSpeech = v;
  }
 
  public get greeted() : boolean {
    return this._greeted;
  }
  
  public set greeted(v : boolean) {
    this._greeted = v;
  }
  //endregion

  //region METHODS
  /**
   * findSpeech() method
   * @param id type from number - speech id
   * @returns type from ISpeech
   * Searches for the index number that has the same speech id
   * of parameter's id, then it returns an ICharacter.
   */
  findSpeech(id: number): ISpeech {
    return this._data.speechesArray[
      this._data.speechesArray.findIndex(speech => speech.id === id)
    ];
  }

  /**
   * feedSpeechesList() method
   * Runs a loop in npc.speeches, finds each item, then pushes it 
   * into a temp value[] variable to be assigned in speeches[] property.
   */
  feedSpeechesList() {
    let value: ISpeech[] = [];
    for (const speech of this.npc.speeches) {
      value.push(this.findSpeech(speech));
    }
    this._speeches = value;
  }
  
  /**
   * findNpc() method
   * @param id type from number - character's id
   * @returns type from ICharacter
   * Searches for the index number that has the same character id
   * of parameter's id, then it returns an ICharacter.
   */
  findNpc(id: number): ICharacter {
    return this._data.charactersArray[
      this._data.charactersArray.findIndex((element) => element.id === id)
    ];
  }

  /**
   * greetPlayer() method
   * @returns type from ISpeech
   * Gets the current hour of the day to then assign a 
   * speech to greet variable. After that it returns an 
   * ISpeech value.
   */
  greetPlayer(): ISpeech {
    this.currentSpeech = this._speeches[
      this._speeches.findIndex(x => x.id === 4) //Good Night!
    ];

    if (this.npc.history.length === 0) {
      let date = new Date();
      let hour = date.getHours();

      if (hour >= 5 && hour <= 11) {
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 1)
        ]; //Good Morning!
      } else if (hour >= 12 && hour <= 17){
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 2)
        ]; //Good Afternoon!
      } else if (hour >= 18 && hour <= 19) {
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 3)
        ]; //Good Evening!
      }
    } else {
      this.currentSpeech = this._speeches[
        this._speeches.findIndex(x => x.id === 5)
      ]; //Nice to see you again, what can I do for you?
    }
    return this.currentSpeech;
  }

  /**
   * answer() method
   * @param player type from PlayerProvider - to use player's speech
   * @param location type from ILocation
   * @returns type from ISpeech - value to be shown in current-location.html
   */
  answer(player: PlayerProvider, location: ILocation): ISpeech {
    if (this._npc.id === 2) {
      return this.performWatsonApproach(player);
    }
    return this.performFirstApproach(player, location);
  }

  /**
   * performFirstApproach() method
   * @param player type from PlayerProvider - to use player's speech
   * @param location type from ILocation
   * @returns type from ISpeech - value to be shown in current-location.html
   * A range of answers to be used accordingly to what player speech passed as
   * parameter.
   */
  performFirstApproach(player: PlayerProvider, location: ILocation): ISpeech {
    switch (player.currentSpeech.id) {
      //Good Morning!, Good Afternoon!, Good Evening!, Good Night!
      case 1: case 2: case 3: case 4:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 6)
        ];//How can I help you?
        break;
      case 17://I'm investigating a crime, have you seen anything or anyone suspicious?
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 18)
        ];//What sort of crime detective?
        break;
      //I'm afraid I can't give any detailed about it right now.
      case 19:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 59)
        ];//Is there anything I can do to help you?
        break;
      case 7://What do you do here?
        this.currentSpeech = this._speeches[0];
        break;//npc job and self-description
      case 8://Do you mind if I take a look around?
        if (this._speeches.findIndex(x => x.id === 9) === -1) {
          this.currentSpeech = this._speeches[
            this._speeches.findIndex(x => x.id === 72)
          ];//No problem, feel free to search around!
        } else {
          this.currentSpeech = this._speeches[
            this._speeches.findIndex(x => x.id === 9)
          ];//Do you have a search warrant?
        }
        //true = Get Warrant or Search Area may be perfomed, false = keep conversation
        this.canSearch = true;
        break;
      case 63://Thank you very much for your help.
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 64)
        ];//Anytime you need!
        break;
      case 73://No, but I can get one in 30 minutes!
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 74)
        ];//No problem, I'll see you next time then!
        break;
      default:
        this.currentSpeech = this.performSecondApproach(player, location);
        break;
    }
    return this.currentSpeech;
  }

  /**
   * performSecondApproach() method
   * @param player type from PlayerProvider - to use player's speech
   * @param location type from ILocation
   * @returns type from ISpeech - value to be shown in current-location.html
   * A range of answers to be used accordingly to what player speech passed as
   * parameter.
   */
  performSecondApproach(player: PlayerProvider, location: ILocation): ISpeech {
    switch (player.currentSpeech.id) {
      case 22://I found some items in this place, they may help me to catch the suspect!
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 77)
        ];//I hope you catch the suspect soon!
        //true = Get Warrant or Search Area may be perfomed, false = keep conversation
        this.canSearch = true;
        break;
      default:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 100)
        ];// empty ''
        break;
    }
    return this.currentSpeech;
  }

  performWatsonApproach(player: PlayerProvider): ISpeech {
    switch (player.currentSpeech.id) {
      //Good Morning!, Good Afternoon!, Good Evening!, Good Night!
      case 1: case 2: case 3: case 4:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 21)
        ];//A murder happened last night at the Big House
        break;
      case 16: //Do you have any News about our investigation?
        if (this._item.collectedItems.length > 0 || 
            this._item.analysingItems.length > 0 ||
            this._item.itemsReady.length > 0) {
          this.currentSpeech = this._speeches[
            this._speeches.findIndex(x => x.id === 82)
          ]; //All you need is in you bag!
        } else {
          this.currentSpeech = this._speeches[
            this._speeches.findIndex(x => x.id === 79)
          ];/* Right! First you need to select a location, 
          talk to the local and search the area for some evidences. */
        }
        break;
      case 78: //Yes, I'm aware of that, we need to start this investigation as soon as possible!
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 79)
        ]; /* Right! First you need to select a location, 
            talk to the local and search the area for some evidences. */
        break;
      case 80: //Fine, lets get this started!
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 81)
        ]; //Alright!
        break;
      default:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 100)
        ];// empty ''
        break;
    }
    return this.currentSpeech;
  }
  //#endregion

}
