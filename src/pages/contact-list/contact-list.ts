import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {

  public contacts = this.player.contactList;

  constructor(private player: PlayerProvider, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  openModal(id) {
    let modal = this.modalCtrl.create(ModalContentPage, id);
    modal.present();
  }
}
