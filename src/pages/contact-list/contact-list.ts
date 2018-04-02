import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';
import { ModalContentPage } from '../modal-content/modal-content';

@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {

  //#region ContactListPage PROPERTIES
  // contacts[] holds the player list of contacts
  public contacts = this.player.inventory.contacts;

  //#endregion

  /* ContactListPage constructor
   @param player - type from PlayerProvider
   @param modaCtrl - type from ModalController
   player provides its contactList property to be looped in
   contact-list.html.
   modalCtrl provides modal view when openModal(id) executes */
  constructor(private player: PlayerProvider, public modalCtrl: ModalController) {}

  //#region METHODS
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

  /* openModal(id) method
   @param id - type from interface ICharacter
   Creates a modal and presents its content in the modal-content-page.html.
   It also passes the id as parameter to be the content. */
  openModal(id) {
    let modal = this.modalCtrl.create(ModalContentPage, id);
    modal.present();
  }
  //#endregion
}
