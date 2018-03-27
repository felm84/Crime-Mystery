import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  public locations = this.player.locationList;

  constructor(private player: PlayerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationListPage');
  }

}
