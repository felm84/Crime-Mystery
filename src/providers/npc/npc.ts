import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';

@Injectable()
export class NpcProvider {
  
  public npc: ICharacter;
  public speeches: ISpeech[] = [];

  constructor(private data: DataProvider) {
    console.log('NpcProvider');
  }

  setNpc(npcId) {
    this.npc = this.data.charactersArray[this.findNpc(npcId)];
    console.log('New Npc - ' + this.npc.name );
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
}
