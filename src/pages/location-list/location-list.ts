import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  public locations = this.player.inventory.locations;

  constructor(private player: PlayerProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationListPage');
  }

  /* openModal(id) method
   @param id - type from interface ILocation
   Creates a modal and presents its content in the modal-content-page.html.
   It also passes the id as parameter to be the content. */
  openModal(id) {
    let modal = this.modalCtrl.create(ModalContentPage, id);
    modal.present();
  }
}
