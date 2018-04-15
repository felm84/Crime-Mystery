import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';

@Injectable()
export class NpcProvider {
  
  private _npc: ICharacter;
  private _speeches: ISpeech[] = [];
  private _currentSpeech: ISpeech;
  private _greeted: boolean = false;

  constructor(private data: DataProvider) {
    console.log('NpcProvider');
  }

  //#region ENCAPSULATION 
  public get npc() : ICharacter {
    return this._npc;
  }
  
  public set npc(v : ICharacter) {
    this._npc = v;
    this.feedSpeechesList();
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
    return this.data.speechesArray[
      this.data.speechesArray.findIndex(speech => speech.id === id)
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
    return this.data.charactersArray[
      this.data.charactersArray.findIndex((element) => element.id === id)
    ];
  }

  /* greetPlayer(): ISpeech
   gets the current hour of the day to then assign a
   speech to greet variable. After that it returns an
   ISpeech value. */
  greetPlayer(): ISpeech {
    let greet: ISpeech = this._speeches[
      this._speeches.findIndex(x => x.id === 4)
    ];

    if (this.npc.history.length === 0) {
      let date = new Date();
      let hour = date.getHours();

      if (hour >= 5 && hour <= 11) {
        greet = this._speeches[
          this._speeches.findIndex(x => x.id === 1)
        ]
      } else if (hour >= 12 && hour <= 17){
        greet = this._speeches[
          this._speeches.findIndex(x => x.id === 2)
        ];
      } else if (hour >= 18 && hour <= 19) {
        greet = this._speeches[
          this._speeches.findIndex(x => x.id === 3)
        ];
      }
    } else {
      greet = this._speeches[
        this._speeches.findIndex(x => x.id === 5)
      ];
    }
    return greet;
  }

  // TODO - fix code: else last speechesArray
  nextSpeech() {
    if (this.speeches.length != 0) {
      this.currentSpeech = this.speeches.shift();

      let index = this.data.charactersArray.findIndex((element) => element.id === this.npc.id)

      this.data.charactersArray[index].speeches.shift();
    } else {
      this.currentSpeech = this.data.speechesArray[7];
    } 
  }

  answerPlayer(speech: ISpeech) {
    switch (speech.id) {
      case 1:
      case 2:
      case 3:
      case 4:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 6)
        ];
        break;
      case 17:
      this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 18)
        ];
        break;
      case 19: case 20:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 59)
        ];
        break;
      case 7:
        this.currentSpeech = this._speeches[0];
        break;
      case 8:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 9)
        ];
        break;
      case 73:
        this.currentSpeech = this._speeches[
          this._speeches.findIndex(x => x.id === 74)
        ];
        break;
      default:
        break;
    }
  }
  //#endregion

}
