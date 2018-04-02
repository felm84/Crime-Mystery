import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {

  private item;
  private option;
  private button;

  constructor(
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private game: GameProvider
  ) {
    this.item = this.navParams.get('id');
    this.option = this.navParams.get('option');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContentPage');
    this.setButton();
  }
  
  setButton() {
    switch (this.option) {
      case 'item':
        this.button = 'Analyse'
        break;
      case 'location':
        this.button = 'Go to'
        break;
      default:
        this.button = 'Chat History'
        break;
    }
  }
  
  doAction() {
    switch (this.option) {
      case 'item':
        this.checkItem();
        break;
      case 'location':
        this.moveTo();        
        break;
      default:
        this.checkChat();
        break;
    }
  }

  checkItem() {
    console.log('Item');
  }

  moveTo() {
    this.game.location.changeLocation(this.item.id);
    this.navCtrl.push(TabsPage);
    console.log('moved');
  }

  checkChat() {
    console.log('Chat');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
