import { Injectable } from '@angular/core';
import { DataProvider } from '../data/data';

@Injectable()
export class NpcProvider {

  public npc;

  constructor(public data: DataProvider) {
    console.log('Hello NpcProvider Provider');
  }

}
