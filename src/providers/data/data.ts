import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ILocation } from '../interface/location';
import { IItem } from '../interface/item';
import { ICharacter } from '../interface/character';
import { ISpeech } from '../interface/speech';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataProvider {

  //#region GameProvider URL database addresses
  private _cUrl = "../../assets/data/characters.json";
  private _sUrl = "../../assets/data/speeches.json";
  private _lUrl = "../../assets/data/locations.json";
  private _iUrl = "../../assets/data/items.json";
  //#endregion

  //#region GameProvider PROPERTY ARRAYS
  public charactersArray: ICharacter[];
  public speechesArray;
  public locationsArray;
  public itemsArray;
  //#endregion

   /**
    * DataProvider constructor
    * @param http type from HttpClient - http provides 
    * all the get, set, put, delete in a HTTP request.
    * HttpClient is a module provide by Angular and it only works 
    * when HttpClientModule is declared in app.module.ts
    */
  constructor(public http: HttpClient) {
    /* When the app is loaded
      it will load all the contents
      to be ready to play */
    this.loadContent();
    console.log('DataProvider******');
  };

  //#region METHODS

  /**
   * loadContent() method
   * Calls all the gets HTTP request in the bellow list.
   * It gets all Characters, Speeches, Locations and Items 
   * from ICharacter, ISpeech, ILocation, IItem interfaces 
   * and assign their data to their specified properties.
   */
  loadContent(){
    this.getCharacters().subscribe(data => this.charactersArray = data);
    this.getSpeeches().subscribe(data => this.speechesArray = data);
    this.getLocations().subscribe(data => this.locationsArray = data);
    this.getItems().subscribe(data => this.itemsArray = data);
    console.log("Content Loaded");
  }

  /**
   * getChracters() method
   * Using the Observable to return ICharacter type, 
   * this method makes the get request and convert the 
   * data to its type.
   */
  getCharacters(): Observable<ICharacter[]> {
    return this.http.get<ICharacter[]>(this._cUrl);
  }

  /**
   * getSpeeches() method
   * Using the Observable to return ISpecch type,
   * this method makes the get request and convert the
   * data to its type.
   */
  getSpeeches(): Observable<ISpeech[]> {
    return this.http.get<ISpeech[]>(this._sUrl);
  }

  /**
   * getLocations() method
   * Using the Observable to return ILocation type,
   * this method makes the get request and convert the
   * data to its type
   */
  getLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(this._lUrl);
  }

  /**
   * getItems() method
   * Using the Observable to return IItems type,
   * this method makes the get request and convert the
   * data to its type.
   */
  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this._iUrl);
  }
  //#endregion

}
