import { Component } from '@angular/core';
import { NavController, NavParams, Platform, App } from 'ionic-angular';
import { SaveProvider } from '../../providers/save/save';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-final',
  templateUrl: 'final.html',
})
export class FinalPage {

  private _criminal: boolean;
  private _config = {
    title: 'GAME OVER',
    phrase: 'You have arrested the wrong person, and the real criminal got away!'
  }

  /**
   * FinalPage constructor
   * @param appCtrl type from App
   * @param platform type from Plarform
   * @param navCtrl type from NavController
   * @param navParams type from NavParams
   * @param _save type from SaveProvider
   */
  constructor(
    public appCtrl: App,
    public platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _save: SaveProvider
  ) {
    //this.appCtrl.getRootNavById('n4').getAllChildNavs()[0].parent.popToRoot();
    this._criminal = this.navParams.get('criminal');
    this.applyConfig();
  }

  ionViewDidLoad() {
    console.log(`Final - ${this.navCtrl}`);
    this._save.storage.clear();
  }

  /**
   * applyConfig() method
   * Apply final presentation accordingly to _criminal property result
   * from CurrentPage
   */
  applyConfig() {
    if (this._criminal) {
      this._config = {
        title: 'CONGRATULATIONS',
        phrase: 'You have solved the crime in: timer'
      }
    }
  }

  /**
   * closeApp() method
   * Closes the application
   */
  closeApp() {
    this.platform.exitApp();
    /* this.appCtrl.getRootNavById('n4').getAllChildNavs()[0].parent.popToRoot().then(
      _ => this.navCtrl.pop()
    ); */
  }
}
