import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  public locations = this.player.locationList;

  constructor(private player: PlayerProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationListPage');
  }

  openModal(id) {
    let modal = this.modalCtrl.create(ModalContentPage, id);
    modal.present();
  }
}
