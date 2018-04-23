import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { ModalContentPage } from '../modal-content/modal-content';
import { ItemProvider } from '../../providers/item/item';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  constructor(
    private _items: ItemProvider, 
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {}

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
    modal.onDidDismiss(item => {
      if (item.id === 100) {
        let index = this._items.itemsReady.findIndex(x => x.id === item.id);
        this._items.itemsReady.splice(index, 1);
        this._items.warrantInProcess = false;
      } 
    });
  }

}
