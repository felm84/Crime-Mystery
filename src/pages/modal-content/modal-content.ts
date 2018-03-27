import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

import { PlayerProvider } from '../../providers/player/player';

@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {

  public item;

  constructor(
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private player: PlayerProvider
  ) {
    this.item = this.navParams.get('id');
  }

  ionViewDidLoad() {
    
    console.log(this.item);
    console.log('ionViewDidLoad ModalContentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
