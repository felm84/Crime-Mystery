import { Component } from '@angular/core';
import { NavParams, PopoverController, ViewController, LoadingController, NavController } from 'ionic-angular';
import { interval } from 'rxjs/observable/interval';
import { GameProvider } from '../../providers/game/game';
import { DataProvider } from '../../providers/data/data';
import { AlertProvider } from '../../providers/alert/alert';
import { SaveProvider } from '../../providers/save/save';
import { HomePage } from '../home/home';

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

      <button ion-item icon-lef (click)="makeArrest()">
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

  // _npc holds NpcProvider class
  private _npc = this._game.npcProvider;

  /**
   * PlusMenu constructor
   * @param viewCtrl type from ViewController
   * @param loadingCtrl type from LoadingController
   * @param alert type from AlertProvider
   * @param _save type from SaveProvider
   * @param _data type from DataProvider
   * @param _game type from GameProvider
   * All parameter injected into the PlusMenu class, so they can be
   * used in the methods and properties.
   */
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public alert: AlertProvider,
    private _save: SaveProvider,
    private _data: DataProvider,
    private _game: GameProvider
  ) {};

  /**
   * getWarrant() method
   * Sets the warrant in analyseItem method if all conditions are met,
   * otherwise pops up an alert with description of what must be done.
   */
  getWarrant() {
    if (!this._game.itemProvider.warrantInProcess && 
      this._npc.canSearch && !this._game.playerProvider.hasWarrant &&
      this._game.locationProvider.location.require_warrant &&
      this._game.locationProvider.location.id !== 1) {

      let warrant = this._game.itemProvider.findItem(100);
      this.alert.presentAlert('Get Warrant', 'It will take up to 30 minutes to be done.');
      this._game.itemProvider.analyseItem(warrant, null);
      this._game.itemProvider.warrantInProcess = true;
      // Save game
      this._save.saveGame();
    } else {
      if (this._game.locationProvider.location.id === 1) {
        this.alert.presentAlert('Search Area', `This location is not under investigation. 
        Please, set another location in the <b>Map Tab</b> to continue the investigation.`);
      } else if (!this._npc.canSearch) {

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

  /**
   * searchArea() method
   * Pulls out all items from the current location and places them
   * into the collectedItem[] throught addItemsToColletion() in 
   * ItemProvider if all conditions are met, otherwise pops up an 
   * alert with description of what must be done.
   */
  searchArea() {
    if ((!this._game.locationProvider.location.require_warrant || 
      this._game.playerProvider.hasWarrant) && this._npc.canSearch &&
      this._game.locationProvider.location.items.length > 0 &&
      this._game.locationProvider.location.id !== 1) {
        if (this._game.playerProvider.hasWarrant && this._game.locationProvider.location.require_warrant) {
          this._game.playerProvider.hasWarrant = false;
        }
        this._data.locationsArray[
          this._data.locationsArray.findIndex(x => x.id === this._game.locationProvider.location.id)
        ].require_warrant = false;
        let items = this._game.locationProvider.releaseItems();
        let loading = this.loadingCtrl.create({
          content: 'Searching area...',
          duration: 5000, //Simulates(not real data loading) detective searching area.
          dismissOnPageChange: true
        });
        loading.onDidDismiss(() => {
          this._game.itemProvider.addItemsToColletion(items);
        });
        loading.present();
        // Save game
        this._save.saveGame();
      } else {
        if (this._game.locationProvider.location.id === 1) {
          this.alert.presentAlert('Search Area', `This location is not under investigation. 
          Please, set another location in the <b>Map Tab</b> to continue the investigation.`);
        } else if (!this._npc.canSearch) {
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

  makeArrest() {
    if (this._game.itemProvider.itemsReady.length === this._data.itemsArray.length) {
      //this.navCtrl.push(ArrestPage);
    } else {
      this.alert.presentAlert('Arrest Suspect', `You still have items to collect or analyse
      before make any arrest. Please continue the investigation.`);
    }
    this.close();
  }

  /**
   * close() method
   * Dismisses the PlusMenu View
   */
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
  /**
   * _location, _npc, _player are injected to be used
   * in the CurrentLocationPage class.
   */
  private _location = this._game.locationProvider;
  private _npc = this._game.npcProvider;
  private _player = this._game.playerProvider;

  // _speak works as a switch (false = npc speaks, true = player speaks).
  private _speak: boolean = false;

  // _playerPhrase and _npcPhrase hold their phrases to be shown in current-location.html
  private _playerPhrase = this._player.currentSpeech;
  private _npcPhrase = this._npc.currentSpeech;
  //#endregion

  // _saveInterval holds 5 minutes interval for the game to be saved.
  private _saveInterval = interval(300000);

  /**
   * CurrentLocationPage contructor
   * @param navParams type from NavParams
   * @param popoverCtrl type from PopoverController
   * @param _save type from SaveProvider
   * @param _game type from GameProvider
   * All parameter injected into the CurrentLocationPage class, so they can be
   * used in the methods and properties.
   */
  constructor( 
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private _save: SaveProvider,
    private _game: GameProvider
  ) { 
    // this.navCtrl.parent.viewCtrl.dismiss();
    // console.log(this.navCtrl.id);
    // console.log(this.navCtrl);
    //console.log();
    //this.navCtrl.goToRoot({animate: true});
  };

  /**
   * ionViewDidLeave() method
   * Switches _speak to false and clear the chat
   * when user leaves the page.
   */
  ionViewDidLeave(){
    this._speak = false;
    this.clearChat();
  }
  
  /**
   * ionViewDidLoad() method
   * Initiates the 5 minute save game interval when the
   * CurrentLocationPage is loaded.
   */
  ionViewDidLoad() {
    this._saveInterval.subscribe(() => this._save.saveGame());
    console.log('ionViewDidLoad CurrentLocationPage'); 
  }

  /**
   * presentPopover() method
   * @param ev type from any - identify the event location
   * Pops up the PlusMenu template with its options.
   */
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PlusMenu);
    popover.present({ev: ev});
  }

  /**
   * showSpeech() method
   * @param element type from string - determine npc or player
   * Chooses which one is turn to speak accordingly to parameter value.
   */
  showSpeech(element) {
    if (!this._speak && element === 'npc') {
      this.npcTalk();
    } else if (this._speak && element === 'player') {
      this.playerTalk();
    }
  }

  /**
   * npcTalk() method
   * Displays npc phrase in current-location.html, pushes
   * the phrase into npc history[] and save the game.
   */
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

  /**
   * playerTalk() method
   * Displays player phrase in current-location.html, pushes
   * the phrase into npc history[] and save the game.
   */
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

  /**
   * clearChat() method
   * Clears npc and player card-content(phrase) */
  clearChat() {
    $('#npcChat').fadeOut();
    $('#playerChat').fadeOut();
  }

}
