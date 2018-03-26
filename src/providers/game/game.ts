import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterProvider } from '../character/character';
import { ItemProvider } from '../item/item';
import { LocationProvider } from '../location/location';
import { SpeechProvider } from './../speech/speech';

@Injectable()
export class GameProvider {

  public charactersArray;
  public speechesArray;
  public locationsArray;
  public itemsArray;

  constructor(
    public http: HttpClient,
    private characters: CharacterProvider,
    private speeches: SpeechProvider,
    private locations: LocationProvider,
    private items: ItemProvider
  ) {}

  loadGameContent(){
    console.log("game loaded");
    this.characters.getCharacters().subscribe(data => this.charactersArray = data);
    this.speeches.getSpeeches().subscribe(data => this.speechesArray = data);
    this.locations.getLocations().subscribe(data => this.locationsArray = data);
    this.items.getItems().subscribe(data => this.itemsArray = data);
  }
}
