import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {

  public items;

  constructor(private item: ItemProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.item.getItems()
    .subscribe( data => this.items = data);
  }

}
