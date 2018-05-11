import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { SaveProvider } from '../../providers/save/save';

@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {

  //#region PROPERTIES
  private _element;
  private _page;
  //#endregion

  /** 
   * ModalContentPage constructor
   * @param navParams type from NavParams
   * @param viewCtrl type from ViewController
   * @param _save type from SaveProvider
   * @param _game type from GameProvider
   * navParams gets information from openModal method and assigns 
   * both element and page to their properties.
   * All parameter injected into the ModaContentPage class, so they can be
   * used in the methods and properties.
   */
  constructor(
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private _save: SaveProvider,
    private _game: GameProvider
  ) {
    this._element = this.navParams.get('element');
    this._page = this.navParams.get('page');
  }

  /**
   * useItem() method
   * It is only used for warrant item
   * Switches playerProvider hasWarrant to true and
   * dismisses the View with warrant item as parameter.
   */
  useItem() {
    this._game.playerProvider.hasWarrant = true;
    this.viewCtrl.dismiss(this._element);
  }

  /**
   * setLocation()
   * Sets currentLocationPage with the clicked location,
   * npc accordingly to current location, adds npc to player's
   * contact list, saves the game and dimisses the View with
   * location as parameter.
   */
  setLocation() {
    this._game.locationProvider.location = this._element;
    this._game.playerProvider.currentLocation = this._element;
    this._game.npcProvider.npc = this._game.npcProvider.findNpc(this._element.npc);
    this._game.playerProvider.addContact(this._game.npcProvider.npc);
    this._game.playerProvider.currentSpeech = this._game.data.speechesArray[
      this._game.data.speechesArray.findIndex(x => x.id === 99)
    ]; //...(initial speech)
    this._save.saveGame();
    this.viewCtrl.dismiss(this._element);
  }

  /**
   * analyseItem()
   * Executes analyseItem() with _element as parameter,
   * removes it from collectedItems[] in ItemProvider class,
   * saves the game and dismisses the View with item as parameter.
   */
  analyseItem() {
    this._game.itemProvider.analyseItem(this._element, null);
    this._game.itemProvider.removeItem(this._element);
    this._save.saveGame();
    this.viewCtrl.dismiss(this._element);
  }

  /** dismiss() method
   * Closes the modal contents page
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
