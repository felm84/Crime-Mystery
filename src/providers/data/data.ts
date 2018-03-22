import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Character } from '../../classes/character';

@Injectable()
export class DataProvider {

  dataSrc: string = "../../assets/data/database.json";

  test: any[];

  constructor(private http: HttpClient) {}

  // Fetch the json data to become objects
  fetchData() {
    return this.http.get(this.dataSrc).subscribe(data => console.log(data));
  }


}
