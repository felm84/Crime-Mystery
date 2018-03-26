import { CurrentNpcPage } from './../current-npc/current-npc';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})


export class CurrentLocationPage {

  public localName;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private game: GameProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentLocationPage');   
  }
}
