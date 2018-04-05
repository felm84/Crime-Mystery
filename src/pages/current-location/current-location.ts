import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GameProvider } from '../../providers/game/game';
import { PlayerProvider } from '../../providers/player/player';

declare var $: any;

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})

export class CurrentLocationPage {

  public chat = [];
  public npcPhrase;
  public playerPhrase;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private game: GameProvider,
  ) {
    
    console.log('From Game - ' + this.game.playerPvd.player);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentLocationPage');
  }

  addCard() {
    // $('#chat').slideToggle();
    $('#npcChat').text('Testsss');
    console.log('tapped');
  }

  clearChat() {
    $('#chat').empty();
    console.log('chat cleared');
  }

}
