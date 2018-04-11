import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    public navCtrl: NavController, 
    public navParams: NavParams,
    private game: GameProvider,
  ) {};

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
      
      $('#playerChat').fadeOut();
      $('#npcChat').fadeIn();
      // Push npc currentSpeech into its history[]
      this.game.npcPvd.npc.history.push(
        this.game.npcPvd.npc.name + " - " + this.game.npcPvd.currentSpeech.phrase);

      // Set players next speech
      this.game.playerPvd.answerNpc(this.game.npcPvd.currentSpeech);
    } else if (this.speak && element === 'player') {
      this.speak = false;
      // Push player currentSpeech into current npcs history[]
      this.game.npcPvd.npc.history.push(
        this.game.playerPvd.player.name + " - " + this.game.playerPvd.currentSpeech.phrase);

      $('#npcChat').fadeOut();
      $('#playerChat').fadeIn();
      
      // Set npc next speech
      this.game.npcPvd.nextSpeech();
    }    
  }

  /* clearChat() method
   Clear npc and player card-content */
  clearChat() {

  }

}
