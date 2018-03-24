import { DataProvider } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SpeechService {

    private speeches = [];
    constructor(data: DataProvider) {
        data.generateSpeeches("../../assets/data/speeches.json")
          .subscribe( npc => this.speeches = npc);
      }
}