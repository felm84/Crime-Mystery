import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';

@Injectable()
export class NpcProvider {
  
  public npc: ICharacter;
  public speeches: ISpeech[] = [];

  public currentSpeech: string = '';

  constructor(private data: DataProvider) {
    console.log('NpcProvider');
  }

  setNpc(npcId) {
    this.npc = this.data.charactersArray[this.findNpc(npcId)];
    this.feedSpeeches();
    this.currentSpeech = this.greetPlayer();
    console.log('New Npc - ' + this.npc );
  }

  feedSpeeches() {
    for (const speech of this.npc.speeches) {
      this.speeches.push(this.data.speechesArray[this.findSpeech(speech)]);
    }
  }

  findSpeech(id) {
    let index = this.data.speechesArray.findIndex((element) => element.id === id);
    return index;
  }
  
  findNpc(id) {
    let index = this.data.charactersArray.findIndex((element) => element.id === id);
    return index;
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
