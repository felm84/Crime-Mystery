import { Component } from '@angular/core';
import { NavParams, PopoverController, ViewController, LoadingController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { DataProvider } from '../../providers/data/data';
import { AlertProvider } from '../../providers/alert/alert';
import { SaveProvider } from '../../providers/save/save';

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

      <button ion-item icon-lef>
        <ion-icon name="lock"></ion-icon>
        Arrest Suspect
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
    public alert: AlertProvider,
    private _save: SaveProvider,
    private _data: DataProvider,
    private _game: GameProvider
  ) {};

  //DONE and WORKING
  getWarrant() {
    if (!this._game.itemProvider.warrantInProcess && 
      this._npc.canSearch && !this._game.playerProvider.hasWarrant &&
      this._game.locationProvider.location.require_warrant) {

      let warrant = this._game.itemProvider.findItem(100);
      this.alert.presentAlert('Get Warrant', 'It will take up to 30 minutes to be done.');
      this._game.itemProvider.analyseItem(warrant, null);
      this._game.itemProvider.warrantInProcess = true;
      // Save game
      this._save.saveGame();
    } else { 
      if (!this._npc.canSearch) {

        this.alert.presentAlert('Get Warrant', `Have a chat with the locals first and see how
        they can help you. Please, tap on the <b>character</b> to start a chat, then on yours.`);
  
      } else if (!this._game.locationProvider.location.require_warrant) {
        this.alert.presentAlert('Get Warrant', `This location does not require a search warrant.
        Please, select <b>Search Area</b> in the header menu.`);

      } else if (this._game.playerProvider.hasWarrant) {
  
        this.alert.presentAlert('Search Area', `You have selected to use yours. 
        Please, select <b>Search Area</b> in the header menu.`);
  
      } else {
        this.alert.presentAlert('Get Warrant', `You already have one in process, 
        check you bag of items.`);
      }
    }
    this.close();
  }

  //DONE and WORKING
  searchArea() {
    if ((!this._game.locationProvider.location.require_warrant || 
      this._game.playerProvider.hasWarrant) && this._npc.canSearch &&
      this._game.locationProvider.location.items.length > 0) {
        if (this._game.playerProvider.hasWarrant && this._game.locationProvider.location.require_warrant) {
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
        // Save game
        this._save.saveGame();
      } else {
        if (!this._npc.canSearch) {
          this.alert.presentAlert('Search Area', `Have a chat with the locals first and see how
          they can help you. Please, tap on the <b>character</b> to start a chat, then on yours.`);
    
        } else if (this._game.locationProvider.location.require_warrant && 
          !this._game.playerProvider.hasWarrant) {
          this.alert.presentAlert('Search Area', `Search warrant is required for this location. 
          Please, select <b>Get Warrant</b> in the header menu.`);
    
        } else if (!this._game.locationProvider.location.require_warrant &&
          this._game.locationProvider.location.items.length === 0 ) {
          this.alert.presentAlert('Search Area', `No more items in this area. Please, set another 
          location in the <b>Map Tab</b> to continue the investigation.`);
    
        }
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
    private _save: SaveProvider,
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

  /** showSpeech(element) method
   * @param element - type from string
   * Shows the npc or player conversation accordingly to
   * the element and speak property value
   */
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
    
    if (this._npcPhrase.phrase) {
      $('#playerChat').fadeOut();
      $('#npcChat').fadeIn();

        // Push npc currentSpeech into its history[]
        this._npc.npc.history.push(
          this._npc.npc.name + " - " + this._npc.currentSpeech.phrase);
      this._speak = true;
    } else {
      this.clearChat();
    }
    //Save game
    this._save.saveGame();
  }

  playerTalk() {
    this._playerPhrase = this._game.playerProvider.answer(this._npc, this._location.location);

    if (this._playerPhrase.phrase) {
      $('#npcChat').fadeOut();
      $('#playerChat').fadeIn();
      
      // Push player currentSpeech into current npcs history[]
      this._npc.npc.history.push(
        this._game.playerProvider.player.name + " - " + this._game.playerProvider.currentSpeech.phrase);
      this._speak = false;
    } else {
      this.clearChat();
    }
    //Save game
    this._save.saveGame();
  }

  /* clearChat() method
   Clear npc and player card-content */
  clearChat() {
    $('#npcChat').fadeOut();
    $('#playerChat').fadeOut();
  }

}
