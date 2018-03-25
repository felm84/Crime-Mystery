import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharacterProvider } from '../../providers/character/character';

@Component({
  selector: 'page-contact-list',
  templateUrl: 'contact-list.html',
})
export class ContactListPage {

  public contacts: any;

  constructor(private contact: CharacterProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactListPage');
    this.contact.getCharacters()
    .subscribe( data => this.contacts = data);
  }

}
