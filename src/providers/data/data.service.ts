import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Character } from '../../classes/character';
import { Speech } from '../../classes/speech';
import { Item } from '../../classes/item';
import { Location } from '../../classes/location';

@Injectable()
export class DataProvider {

  dataSrc: string = "../../assets/data/database.json";
  character: Character[];
  speech: Speech[];
  location: Location[];
  item: Item[];

  constructor(private http: HttpClient) {}

  // Fetch the json data to become objects
  fetchData() {
    return this.http.get(this.dataSrc);
  }

  generateCharacter() {
    let test = this.fetchData().subscribe(data => console.log(data));
    //console.log(test);
    
  }

}
