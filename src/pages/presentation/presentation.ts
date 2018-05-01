import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SaveProvider } from '../../providers/save/save';

@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  /**
   * PresentationPage constructor
   * @param loadingCtrl type from LoadingController
   * @param navCtrl type from NavController
   * @param _save type from SaveProvider
   * All parameter injected into the PresentationPage class, so they can be
   * used in the methods and properties.
   */
  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    private _save: SaveProvider
  ) {console.log(this.navCtrl.id)}

  /**
   * investigateCrime()
   * Starts new game by loading and setting all game's
   * properties, pops up a loading spinner for 1 second
   * and when it's dismissed pushes TabsPage on top of
   * navCtrl.
   */
  investigateCrime() {
    let loading = this.loadingCtrl.create({
      content: 'Loading game...',
      dismissOnPageChange: true
    });
    loading.onDidDismiss(() => {
      this.navCtrl.push(TabsPage);
    });
    loading.present();
    this._save.startNewGame()
    .then(() => this._save.saveGame())
    .then(() => loading.dismiss());
  }

}
