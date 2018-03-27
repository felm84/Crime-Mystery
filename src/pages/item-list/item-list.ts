import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  public items = this.player.itemList;

  constructor(private player: PlayerProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
