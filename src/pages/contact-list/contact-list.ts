import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerProvider } from '../../providers/player/player';

@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {

  public contacts = this.player.contactList;

  constructor(private player: PlayerProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
  }

}
