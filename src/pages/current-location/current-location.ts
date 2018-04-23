import { Component } from '@angular/core';
import { NavParams, PopoverController, ViewController, LoadingController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { DataProvider } from '../../providers/data/data';

// $ declared to be used as jquery
declare var $: any;
@Component({
  template: `<ion-list>
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

  private _npc = this._game.npcProvider;

  constructor(
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private _data: DataProvider,
    private _game: GameProvider
  ) {};

  getWarrant() {
    if (!this._game.itemProvider.warrantInProcess && 
      this._npc.canSearch && !this._game.playerProvider.hasWarrant) {

      let warrant = this._game.itemProvider.findItem(100);
      this._game.itemProvider.presentAlert('Search warrant', 'It will take up to 30 minutes to be done.');
      this._game.itemProvider.analyseItem(warrant);
      this._game.itemProvider.warrantInProcess = true;
    } else { 
      if (!this._npc.canSearch) {

        this._game.itemProvider.presentAlert('Search Warrant', `Have a chat with the locals first and see how
        they can help you. Please, tap on the <b>character</b> to start a chat, then on yours.`);
  
      } else if (this._game.playerProvider.hasWarrant) {
  
        this._game.itemProvider.presentAlert('Search warrant', `You have selected to use yours. 
        Please, select <b>Search Area</b> in the header menu.`);
  
      } else {
        this._game.itemProvider.presentAlert('Search warrant', `You already have one in process, 
        check you bag of items.`);
      }
    }
    this.close();
  }

  //Working
  searchArea() {
    if ((!this._game.playerProvider.currentLocation.require_warrant || 
      this._game.playerProvider.hasWarrant) && this._npc.canSearch) {
      if (this._game.playerProvider.currentLocation.require_warrant && 
        this._game.playerProvider.hasWarrant) {
        this._game.playerProvider.hasWarrant = false;
      }
      this._data.locationsArray[
        this._data.locationsArray.findIndex(x => x.id === this._game.locationProvider.location.id)
      ].require_warrant = false;
      let items = this._game.locationProvider.releaseItems();
      let loading = this.loadingCtrl.create({
        content: 'Searching area...',
        duration: 5000,
        dismissOnPageChange: true
      });
      loading.onDidDismiss(() => {
        this._game.itemProvider.addItemsToColletion(items);
      });
      loading.present();      
    } else if (!this._npc.canSearch) {
      this._game.itemProvider.presentAlert('Search Area', `Have a chat with the locals first and see how
      they can help you. Please, tap on the <b>character</b> to start a chat, then on yours.`);
    } else {
      this._game.itemProvider.presentAlert('Search Area', `Search warrant is required for this location. 
      Please, select <b>Get Warrant</b> in the header menu.`);
    }
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
  private _location = this._game.locationProvider;
  private _npc = this._game.npcProvider;
  private _player = this._game.playerProvider;

  // speak works as a switch (false = npc speaks, true = player speaks)
  private _speak: boolean = false;
  private _playerPhrase = this._player.currentSpeech;
  private _npcPhrase = this._npc.currentSpeech;
  //#endregion

  constructor( 
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private _game: GameProvider
  ) {};

  ionViewDidLeave(){
    this._speak = false;
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
    if (this._speak === false && element === 'npc') {
      this.npcTalk();
    } else if (this._speak && element === 'player') {
      this.playerTalk();
    }    
  }

  npcTalk() {
    if (!this._npc.greeted) {
      this._npcPhrase = this._npc.greetPlayer();
      this._npc.greeted = true;
    } else {      
      this._npcPhrase = this._npc.answer(this._player, this._location.location);
    }
    
    $('#playerChat').fadeOut();
    $('#npcChat').fadeIn();
    // Push npc currentSpeech into its history[]
    this._npc.npc.history.push(
      this._npc.npc.name + " - " + this._npc.currentSpeech.phrase);

    this._speak = true;
  }

  playerTalk() {
    if (this._npc.currentSpeech.id === 74) {
      this._game.itemProvider.presentAlert('Search Warrant', `Search warrant is required for this location. 
    Please, select <b>Get Warrant</b> in the header menu.`);
    } else if (this._npc.currentSpeech.id === 64) {
      this._game.itemProvider.presentAlert('Search Area', `Now you may search the area by selecting <b>search 
      area</b> in the header menu.`);
    } else {
      this._playerPhrase = this._game.playerProvider.answer(this._npc, this._location.location);

      $('#npcChat').fadeOut();
      $('#playerChat').fadeIn();
      
      // Push player currentSpeech into current npcs history[]
      this._npc.npc.history.push(
        this._game.playerProvider.player.name + " - " + this._game.playerProvider.currentSpeech.phrase);
    }
    this._speak = false;
  }

  /* clearChat() method
   Clear npc and player card-content */
  clearChat() {
    $('#npcChat').fadeOut();
    $('#playerChat').fadeOut();
  }

}
