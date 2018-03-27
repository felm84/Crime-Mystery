import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  public items = this.player.itemList;

  constructor(private player: PlayerProvider, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

  openModal(id) {
    let modal = this.modalCtrl.create(ModalContentPage, id);
    modal.present();
 }

}
