import { CurrentNpcPage } from './../current-npc/current-npc';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { PlayerProvider } from './../../providers/player/player';

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})


export class CurrentLocationPage {

  public localName: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private game: GameProvider,
    private player: PlayerProvider
  ) {}

  ionViewDidLoad() {
    this.localName = this.player.currentLocation.name;
    console.log('ionViewDidLoad CurrentLocationPage');
  }
}
