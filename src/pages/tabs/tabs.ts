import { Component } from '@angular/core';
import { CurrentLocationPage } from './../current-location/current-location';
import { ItemListPage } from '../item-list/item-list';
import { LocationListPage } from '../location-list/location-list';
import { ContactListPage } from '../contact-list/contact-list';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  template: `<ion-tabs>
              <ion-tab tabIcon="pin" tabTitle="Location" [root]="_location"></ion-tab>
              <ion-tab tabIcon="briefcase" tabTitle="Items" [root]="_items"></ion-tab>
              <ion-tab tabIcon="map" tabTitle="Map" [root]="_maps"></ion-tab>
              <ion-tab tabIcon="people" tabTitle="Contacts" [root]="_contacts"></ion-tab>
            </ion-tabs>`
})

export class TabsPage {

  /* location, items, maps, contacts, hold all the pages to be loaded
   when user selects one of the tabs option */
  private _location: any;
  private _items: any;
  private _maps:any;
  private _contacts:any;

  /**
   * TabsPage constructor
   * Initializes all properties to be used in the template
   */
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
    this._location = CurrentLocationPage;
    this._items = ItemListPage;
    this._maps = LocationListPage;
    this._contacts = ContactListPage;
    console.log(this.navCtrl.id);
  }

}
