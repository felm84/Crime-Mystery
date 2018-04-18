import { Component } from '@angular/core';
import { NavParams, PopoverController, ViewController, LoadingController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

// $ declared to be used as jquery
declare var $: any;
@Component({
  template: `<ion-list>
      <button ion-item icon-lef (click)="chat()">
        <ion-icon name="chatbubbles"></ion-icon>
        Chat
      </button>

      <button ion-item icon-lef (click)="getWarrant()">
        <ion-icon name="document"></ion-icon>
        Get Warrant
      </button>
 
      <button ion-item icon-lef (click)="searchArea()">
        <ion-icon name="search"></ion-icon>
        Search Area
      </button>

      <button ion-item icon-lef (click)="close()">
        <ion-icon name="close-circle"></ion-icon>
        Close
      </button>

  </ion-list>`
})

export class PlusMenu {

  constructor(
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private _game: GameProvider
  ) {};

  chat() {
    this.close();
  }

  getWarrant() {
    let warrant = this._game.itemProvider.findItem(100);
    this._game.itemProvider.presentAlert('Search warrant', 'It will take up to 30 minutes to be done.');
    this._game.itemProvider.analyseItem(warrant);
    //this._game.itemProvider.startTimer(1);
    this.close();
  }

  //Working
  searchArea() {
    let items = this._game.locationProvider.releaseItems();
    let loading = this.loadingCtrl.create({
      content: 'Searching area...',
      duration: 5000,
      dismissOnPageChange: true
    });
    loading.onDidDismiss(() => {
      this._game.itemProvider.addItems(items);
    });
    loading.present();
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html'
})

export class CurrentLocationPage {

  //#region PROPERTIES
  // speak works as a switch
  private speak: boolean = false;
  //#endregion

  constructor( 
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private _game: GameProvider
  ) {};

  ionViewDidLeave(){
    this.speak = false;
    this.clearChat();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentLocationPage'); 
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PlusMenu);
    popover.present({ev: ev});
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
