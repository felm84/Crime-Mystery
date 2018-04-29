import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { ModalContentPage } from '../modal-content/modal-content';
import { ItemProvider } from '../../providers/item/item';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  /**
   * ItemListPage contructor
   * @param _items type from ItemProvider
   * @param modalCtrl type from ModalController
   * @param navCtrl type from NavController
   * All parameter injected into the ItemListPage class, so they can be
   * used in the methods and properties.
   */
  constructor(
    private _items: ItemProvider, 
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {}

  /**
   * openModal() method
   * @param element type from IItem
   * @param page type from string
   * Creates a modal and presents its content in the modal-content-page.html.
   * When it is dismissed checks if the item was a warrant that was clicked
   * to be used, so it sends the warrant into itemsReady[] in
   * ItemProvider 
   */
  openModal(element, page) {
    let modal = this.modalCtrl.create(ModalContentPage, element, page);
    modal.present();
    modal.onDidDismiss(item => {
      if (item) {
        if (item.id === 100) {
          let index = this._items.itemsReady.findIndex(x => x.id === item.id);
          this._items.itemsReady.splice(index, 1);
          this._items.warrantInProcess = false;
        }
      }
    });
  }

}
