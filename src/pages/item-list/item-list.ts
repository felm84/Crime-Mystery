import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  // items[] holds the player inventory list of collected items
  public items = this.player.inventory.items;

  constructor(private player: PlayerProvider, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

  /* openModal(element, page) method
   @param element - type from interface IItem
   @param page - type from string
   Creates a modal and presents its content in the modal-content-page.html.
   It also passes an element and page as parameter to be the content. */
   openModal(element, page) {
    let modal = this.modalCtrl.create(ModalContentPage, element, page);
    modal.present();
  }

}
