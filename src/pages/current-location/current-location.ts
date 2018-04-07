import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GameProvider } from '../../providers/game/game';

declare var $: any;

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})

export class CurrentLocationPage {

  public chat = [];

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

  showNpcSpeech() {
    $('#playerChat').fadeOut();
    $('#npcChat').fadeIn();
    this.game.npcPvd.nextSpeech();
    console.log('NPC speech...');
  }

  showPlayerSpeech() {
    $('#npcChat').fadeOut();
    $('#playerChat').fadeIn();
    this.game.playerPvd.currentSpeech = '';
    console.log('Player speech...');
  }

  clearChat() {
    $('#chat').empty();
    console.log('chat cleared');
  }

}
