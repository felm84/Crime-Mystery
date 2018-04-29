import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  // locations: ILocation[] holds the player inventory list of visited locations
  public locations = this.player.inventory.locations;

  /**
   * LocationsLisPage constructor
   * @param player type from PlayerProvider
   * @param modalCtrl type from ModalController
   * @param navCtrl type from NavController
   * All parameter injected into the LocationsLisPage class, so they can be
   * used in the methods and properties.
   */
  constructor(
    private player: PlayerProvider, 
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {}

  /**
   * openModal()
   * @param element type from ILocation
   * @param page type from string
   * Creates a modal and presents its content in the modal-content-page.html.
   * It also passes an element and page as parameter to be the content.
   * When modal is dismissed it returns data, if not undefined it takes
   * player to current location page
   */
  openModal(element, page) {
    let modal = this.modalCtrl.create(ModalContentPage, element, page);
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.navCtrl.parent.select(0);
      }
    });
  }
}
