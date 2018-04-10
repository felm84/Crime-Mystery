import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  // locations: ILocation[] holds the player list of visited locations
  public locations = this.player.inventory.locations;

  constructor(private player: PlayerProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationListPage');
  }

  /* openModal(id, page) method
   @param id - type from interface ILocation
   @param page - type from string
   Creates a modal and presents its content in the modal-content-page.html.
   It also passes the id as parameter to be the content. */
  openModal(element, page) {
    let modal = this.modalCtrl.create(ModalContentPage, element, page);
    modal.present();
  }
}
