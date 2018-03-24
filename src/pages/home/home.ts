import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationService } from './../../providers/services/location.service';
import { SpeechService } from './../../providers/services/speech.service';
import { CharacterService } from './../../providers/services/character.service';
import { ItemService } from '../../providers/services/item.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public characters;
  public speeches;
  public locations;
  public items;

  constructor(
    private char: CharacterService,
    private speech: SpeechService,
    private location: LocationService,
    private item: ItemService
  ) {}
  
  ngOnInit() {
    this.char.getCharacters()
    .subscribe( data => this.characters = data);
    this.speech.getSpeeches()
    .subscribe( data => this.speeches = data);
    this.location.getLocations()
    .subscribe( data => this.locations = data);
    this.item.getItems()
    .subscribe( data => this.items = data);
  }
}
