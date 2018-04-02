import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PlayerProvider } from '../../providers/player/player';
import { LocationProvider } from '../../providers/location/location';
import { NpcProvider } from '../../providers/npc/npc';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})

export class CurrentLocationPage {

  public name; //Name to be loaded accordingly to location in LocationProvider;
  public npc; //A ICharacter to be loaded accordingly to current location
  public items; //Array to be loaded accordingly to list of items in LocationProvider;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private game: GameProvider
  ) {}

  ionViewDidLoad() {
    this.name = this.game.location.location.name;
    this.items = this.game.location.location.items;
    console.log('ionViewDidLoad CurrentLocationPage - ' + this.name);
  }

  loadItemList() {
    
  }
}
