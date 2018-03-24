import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ICharacter } from '../classes/character';
import { ISpeech } from '../classes/speech';
import { ILocation } from '../classes/location';
import { IItem } from '../classes/item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataProvider {

  private Url: string;

  constructor(private http: HttpClient) {}

  generateCharacters(url:string): Observable<ICharacter[]> {
    return this.http.get<ICharacter[]>(url);
  }

  generateSpeeches(url:string): Observable<ISpeech[]> {
    return this.http.get<ISpeech[]>(this.Url);
  }

  generateLocations(url:string): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(this.Url);
  }

  generateItems(url:string): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.Url);
  }

}
