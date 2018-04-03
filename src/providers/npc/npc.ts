import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';

@Injectable()
export class NpcProvider {
  
  public npc; //Holds npc for current locationpublic npc;

  constructor(public data: DataProvider) {
    console.log('Hello NpcProvider Provider');
  }

  findNpc(id) {
    let index = this.data.charactersArray.findIndex((element) => element.id === id);
    return index;
  }
}
