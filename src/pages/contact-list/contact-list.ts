import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {

  //#region ContactListPage PROPERTIES
  // contacts[] holds the player's inventory contact list
  private contacts = this.player.inventory.contacts;

  //#endregion

  /* ContactListPage constructor
   @param player - type from PlayerProvider
   @param modaCtrl - type from ModalController
   player provides its contactList property to be looped in
   contact-list.html.
   modalCtrl provides modal view when openModal(element, page) executes */
  constructor(private player: PlayerProvider, private modalCtrl: ModalController) {}

  //#region METHODS
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  /* openModal(element, page) method
   @param element - type from interface ICharacter
   @param page - type from string
   Creates a modal and presents its content in the modal-content-page.html.
   It also passes an element and page as parameter to be the content. */
   openModal(element, page) {
    let modal = this.modalCtrl.create(ModalContentPage, element, page);
    modal.present();
  }
  //#endregion
}
