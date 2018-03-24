import { Injectable } from '@angular/core';
import { DataProvider } from '../../providers/services/data.service';

@Injectable()
export class CharacterService {

    private characters = [];
    constructor(data: DataProvider) {
        data.generateCharacters("../../assets/data/characters.json")
          .subscribe( data => this.characters = data);
      }
}
