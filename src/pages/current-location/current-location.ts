import { CurrentNpcPage } from './../current-npc/current-npc';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})


export class CurrentLocationPage {

  public localName;

  public felipe;
  public charactersArray;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private game: GameProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentLocationPage');
    //this.loadGame();
    this.felipe = this.game.charactersArray;

    for (const npc of this.felipe) {
      console.log(npc.name);
    }
   
  }
}
