import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

// $ declared to be used as jquery
declare var $: any;

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})

export class CurrentLocationPage {

  //#region PROPERTIES
  // speak works as a switch
  private speak: boolean = false;
  //#endregion

  constructor( 
    public navParams: NavParams,
    private _game: GameProvider
  ) {};

  ionViewDidLeave(){
    this.speak = false;
    this.clearChat();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentLocationPage');
    
  }

  /* showSpeech(element) method
   @param element - type from string
   Shows the npc or player conversation accordingly to
   the element and speak property value  */
  showSpeech(element) {
    if (this.speak === false && element === 'npc') {
      this.speak = true;

      if (!this._game.npcProvider.greeted) {
        this._game.npcProvider.currentSpeech = this._game.npcProvider.greetPlayer();
        this._game.npcProvider.greeted = true;
      } else {
        this._game.npcProvider.answerPlayer(this._game.playerProvider.currentSpeech);
      }
      
      $('#playerChat').fadeOut();
      $('#npcChat').fadeIn();
      // Push npc currentSpeech into its history[]
      this._game.npcProvider.npc.history.push(
        this._game.npcProvider.npc.name + " - " + this._game.npcProvider.currentSpeech.phrase);

    } else if (this.speak && element === 'player') {
      this.speak = false;

      this._game.playerProvider.answerNpc(this._game.npcProvider.currentSpeech);

      $('#npcChat').fadeOut();
      $('#playerChat').fadeIn();
      
      // Push player currentSpeech into current npcs history[]
      this._game.npcProvider.npc.history.push(
        this._game.playerProvider.player.name + " - " + this._game.playerProvider.currentSpeech.phrase);
    }    
  }

  /* clearChat() method
   Clear npc and player card-content */
  clearChat() {
    $('#npcChat').fadeOut();
    $('#playerChat').fadeOut();
  }

}
