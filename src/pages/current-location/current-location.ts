import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GameProvider } from '../../providers/game/game';

declare var $: any;

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})

export class CurrentLocationPage {

  private npcSpeak: boolean = true;
  private playerSpeak: boolean = false;

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
    if (this.npcSpeak) {
      this.npcSpeak = false;
      this.playerSpeak = true;

      $('#playerChat').fadeOut();
      $('#npcChat').fadeIn();

      this.game.npcPvd.npc.history.push(
        this.game.npcPvd.npc.name + " - " + this.game.npcPvd.currentSpeech.phrase);

      this.game.playerPvd.answerNpc(this.game.npcPvd.currentSpeech);
    }
    
  }

  showPlayerSpeech() {
    if (this.playerSpeak) {
      this.playerSpeak = false;
      this.npcSpeak = true;

      this.game.npcPvd.npc.history.push(
        this.game.playerPvd.player.name + " - " + this.game.playerPvd.currentSpeech.phrase);

      $('#npcChat').fadeOut();
      $('#playerChat').fadeIn();
      
      this.game.npcPvd.nextSpeech();
    }
  }

  clearChat() {
    $('#chat').empty();
    console.log('chat cleared');
  }

}
