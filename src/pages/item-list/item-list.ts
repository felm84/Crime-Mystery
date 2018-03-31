import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  public items = this.player.inventory.items;

  constructor(private player: PlayerProvider, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

  /* openModal(id) method
   @param id - type from interface IItem
   Creates a modal and presents its content in the modal-content-page.html.
   It also passes the id as parameter to be the content. */
  openModal(id) {
    let modal = this.modalCtrl.create(ModalContentPage, id);
    modal.present();
  }

}
