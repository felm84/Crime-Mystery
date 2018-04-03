import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-current-location',
  templateUrl: 'current-location.html',
})

export class CurrentLocationPage {

  public chat = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private game: GameProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentLocationPage - ' + this.game.location.location.name);
  }

  addCard() {
    let card = document.createElement("page-card");
    document.getElementById("chatCards").appendChild(card);
  }

}
