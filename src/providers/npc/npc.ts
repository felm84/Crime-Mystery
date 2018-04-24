import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';
import { ILocation } from '../interface/location';
import { PlayerProvider } from '../player/player';

@Injectable()
export class NpcProvider {
  
  private _npc: ICharacter;
  private _speeches: ISpeech[] = [];
  private _currentSpeech: ISpeech;
  private _greeted: boolean;
  public canSearch: boolean = false;

  constructor(private _data: DataProvider) {
    console.log('NpcProvider******');
  }

  //#region ENCAPSULATION 
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
  
  
  //#endregion

  //#region METHODS
  /* findSpeech(id): ISpeech method
   @param id - type from number
   searches for the index number that has the same speech id
   as the id passed as a parameter, then it returns an ICharacter */
  findSpeech(id: number): ISpeech {
    return this._data.speechesArray[
      this._data.speechesArray.findIndex(speech => speech.id === id)
    ];
  }

  /* feedSpeechesList() method
   runs a loop in npc.speeches, finds each item, then pushes it
   into a temp value[] variable to be assigned in speeches[] property */
  feedSpeechesList() {
    let value: ISpeech[] = [];
    for (const speech of this.npc.speeches) {
      value.push(this.findSpeech(speech));
    }
    this._speeches = value;
  }
  
  /* findNpc(id): ICharacter method
   @param id - type from number
   searches for the index number that has the same character id
   as the id passed as a parameter, then it returns an ICharacter */
  findNpc(id: number): ICharacter {
    return this._data.charactersArray[
      this._data.charactersArray.findIndex((element) => element.id === id)
    ];
  }

  /* greetPlayer(): ISpeech
   gets the current hour of the day to then assign a
   speech to greet variable. After that it returns an
   ISpeech value. */
  greetPlayer(): ISpeech {
    this.currentSpeech = this._speeches[
      this._speeches.findIndex(x => x.id === 4)
    ];

    if (this.npc.history.length === 0) {
      let date = new Date();
      let hour = date.getHours();

      if (hour >= 5 && hour <= 11) {
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 1)
        ]
      } else if (hour >= 12 && hour <= 17){
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 2)
        ];
      } else if (hour >= 18 && hour <= 19) {
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 3)
        ];
      }
    } else {
      this.currentSpeech = this._speeches[
        this._speeches.findIndex(x => x.id === 5)
      ];
      //***** */
    }
    return this.currentSpeech;
  }

  answer(player: PlayerProvider, location: ILocation): ISpeech {
    return this.performFirstAproach(player, location);
  }

  performFirstAproach(player: PlayerProvider, location: ILocation): ISpeech {
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
        // Ends the conversation to get the warrant
        break;
      default:
        break;
    }
    return this.currentSpeech;
  }
  //#endregion

}
