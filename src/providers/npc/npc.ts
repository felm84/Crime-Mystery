import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';
import { ICharacter } from '../interface/character';

@Injectable()
export class NpcProvider {
  
  public npc: ICharacter;

  constructor(private data: DataProvider) {
    console.log('NpcProvider');
  }

  
  findNpc(id) {
    let index = this.data.charactersArray.findIndex((element) => element.id === id);
    return index;
  }
}
