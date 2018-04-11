import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';

@Injectable()
export class NpcProvider {
  
  private _npc: ICharacter;
  private _speeches: ISpeech[] = [];
  private _currentSpeech: ISpeech;

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
    this.currentSpeech = this.greetPlayer();
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
  //#endregion
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
    this.speeches = value;
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
    let greet: ISpeech = this.data.speechesArray[3];

    let date = new Date();
    let hour = date.getHours();

    if (hour >= 5 && hour <= 11) {
      greet = this.data.speechesArray[0]
    } else if (hour >= 12 && hour <= 17){
      greet = this.data.speechesArray[1];
    } else if (hour >= 18 && hour <= 19) {
      greet = this.data.speechesArray[2];
    }

    return greet;
  }

  // TODO - fix code: else last speechesArray
  nextSpeech() {
    if (this.speeches.length != 0) {
      this.currentSpeech = this.speeches.shift();
    } else {
      this.currentSpeech = this.data.speechesArray[7];
    } 
  }

}
