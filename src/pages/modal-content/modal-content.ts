import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {

  private element;
  private page;
  private button: string;

  constructor(
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private game: GameProvider
  ) {
    this.element = this.navParams.get('element');
    this.page = this.navParams.get('page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContentPage');
    this.setButton();
  }
  
  setButton() {
    switch (this.page) {
      case 'item':
        this.button = 'Analyse';
        break;
      case 'location':
        this.button = 'Set Location';
        break;
      case 'contact':
        this.button = 'Chat History';
        break;
    }
  }
  
  doAction() {
    switch (this.page) {
      case 'item':
        this.checkItem();
        break;
      case 'location':
        this.game.changeLocation(this.element);
        this.dismiss();
        break;
      default:
        this.checkChat();
        break;
    }
  }

  checkItem() {
    console.log('Item');
  }

  checkChat() {
    console.log('Chat');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
