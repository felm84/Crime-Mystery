import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { PlayerProvider } from '../../providers/player/player';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})

export class CurrentLocationPage {

  public name; //Name to be loaded accordingly to player's current location;
  public npc; //A ICharacter to be loaded accordingly to current location
  public items; //Array to be loaded accordingly to current location;
  public collectedItems; //Array starts empty

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private game: GameProvider,
    private player: PlayerProvider,
    private location: LocationProvider
  ) {}

  ionViewDidLoad() {
    this.name = this.player.currentLocation.name;
    console.log('ionViewDidLoad CurrentLocationPage - ' + this.name);
  }
}
