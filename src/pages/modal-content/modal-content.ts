import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {

  //#region PROPERTIES
  private element;
  private page;
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
    private game: GameProvider
  ) {
    this.element = this.navParams.get('element');
    this.page = this.navParams.get('page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContentPage');
  }
  
  /* doAction() method
   It will execute another method based on the seleted tab option,
   the swtich statement checks page property */
  doAction() {
    switch (this.page) {
      case 'item':
        this.checkItem();
        break;
      case 'location':
        this.game.changeLocation(this.element);
        this.dismiss();
        break;
      default:
        this.checkChat();
        break;
    }
  }

  checkItem() {
    console.log('Item');
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
