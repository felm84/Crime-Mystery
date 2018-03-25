import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public items;

  constructor(public navCtrl: NavController, public navParams: NavParams, private item: ItemProvider) {
    this.item.getItems()
    .subscribe( data => this.items = data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    
  }

}
