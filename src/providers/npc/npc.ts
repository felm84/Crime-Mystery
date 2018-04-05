import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';

@Injectable()
export class NpcProvider {
  
  public npc: ICharacter;

  constructor(private data: DataProvider) {
    console.log('NpcProvider');
  }

  setNpc(npcId) {
    this.npc = this.data.charactersArray[this.findNpc(npcId)];
    console.log('New Npc - ' + this.npc.name );
  }
  
  findNpc(id) {
    let index = this.data.charactersArray.findIndex((element) => element.id === id);
    return index;
  }
}
