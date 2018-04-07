import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';

@Injectable()
export class NpcProvider {
  
  private _npc: ICharacter;
  private _speeches: ISpeech[] = [];
  private _currentSpeech: string = '';

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
  
  public get currentSpeech() : string {
    return this._currentSpeech;
  }
   
  public set currentSpeech(v : string) {
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

  greetPlayer() {
    let greet = '';
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 6 && hour <= 12) {
      greet = this.speeches[0].phrase;
    } else if (hour >= 13 && hour <= 17){
      greet = this.speeches[1].phrase;
    } else if (hour >= 18 && hour <= 19) {
      greet = this.speeches[2].phrase;
    } else {
      greet = this.speeches[3].phrase;
    }
    console.log(greet);
    return greet;
  }

  nextSpeech() {
    
  }

}
