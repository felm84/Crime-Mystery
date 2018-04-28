import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    private _game: GameProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentationPage');
  }

  investigateCrime() {
    this._game.startNewGame();
    let loading = this.loadingCtrl.create({
      content: 'Loading game...',
      duration: 2000,
      dismissOnPageChange: true
    });
    loading.onDidDismiss(() => {
      this.navCtrl.push(TabsPage);
    });
    loading.present();
  }

}
