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
    console.log('New Npc - ' + this.npc );
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

  findSpeech(id: number): ISpeech {
    return this.data.speechesArray[
      this.data.speechesArray.findIndex(speech => speech.id === id)
    ];
  }

  feedSpeechesList() {
    let value: ISpeech[] = [];
    for (const speech of this.npc.speeches) {
      value.push(this.findSpeech(speech));
    }
    this.speeches = value;
  }
  
  findNpc(id: number): ICharacter {
    return this.data.charactersArray[
      this.data.charactersArray.findIndex((element) => element.id === id)
    ];
  }

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

  nextSpeech() {
    if (this.speeches.length != 0) {
      this.currentSpeech = this.speeches.shift();
    } else {
      this.currentSpeech = this.data.speechesArray[7];
    } 
  }

}
