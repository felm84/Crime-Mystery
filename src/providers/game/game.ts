import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ILocation } from '../classes/location';
import { IItem } from '../classes/item';
import { ICharacter } from '../classes/character';
import { ISpeech } from '../classes/speech';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GameProvider {

  private _cUrl = "../../assets/data/characters.json";
  private _sUrl = "../../assets/data/speeches.json";
  private _lUrl = "../../assets/data/locations.json";
  private _iUrl = "../../assets/data/items.json";

  public charactersArray;
  public speechesArray;
  public locationsArray;
  public itemsArray;

  constructor(public http: HttpClient) {}

  /* @loadGameContent() - load all the content
   available from:
   CharacterProvider, SpeechProvider, LocationProvider
   and ItemProvider */
  loadGameContent(){
    console.log("game loaded");
    this.getCharacters().subscribe(data => this.charactersArray = data);
    this.getSpeeches().subscribe(data => this.speechesArray = data);
    this.getLocations().subscribe(data => this.locationsArray = data);
    this.getItems().subscribe(data => this.itemsArray = data);
  }

  getCharacters(): Observable<ICharacter[]> {
    return this.http.get<ICharacter[]>(this._cUrl);
  }

  getSpeeches(): Observable<ISpeech[]> {
    return this.http.get<ISpeech[]>(this._sUrl);
  }

  getLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(this._lUrl);
  }

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this._iUrl);
  }


}
