import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private game: GameProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentationPage');
  }

  investigateCrime() {
    this.game.loadNewGame();
    this.navCtrl.push(TabsPage);
  }

}
