import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {

  //#region PROPERTIES
  private _element;
  private _page;
  //#endregion

  /* ModalContentPage constructor
   @param navParams - type from NavParams
   @param viewCtrl - type from ViewController
   @param game - type from GameProvider
   navParams gets information from openModal method and assigns
   both element and page to their properties.
   game provides all informations to be used in this class */
  constructor(
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private _game: GameProvider
  ) {
    this._element = this.navParams.get('element');
    this._page = this.navParams.get('page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContentPage');
  }

  setLocation() {
    this._game.locationProvider.location = this._element;
    this._game.npcProvider.npc = this._game.npcProvider.findNpc(this._element.npc);
    this._game.playerProvider.addContact(this._game.npcProvider.npc);
    this.viewCtrl.dismiss(this._element);
  }

  analyseItem() {
    this._game.itemProvider.analyseItem(this._element);
    this.viewCtrl.dismiss(this._element);
  }

  checkChat() {
    console.log('Chat');
  }

  /* dismiss() method
   Closes the modal contents page */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
