import { Component } from '@angular/core';
import { CurrentLocationPage } from './../current-location/current-location';
import { ItemListPage } from '../item-list/item-list';
import { LocationListPage } from '../location-list/location-list';
import { ContactListPage } from '../contact-list/contact-list';

@Component({
  selector: 'page-tabs',
  template: `<ion-tabs>
              <ion-tab tabIcon="home" tabTitle="Home" [root]="home"></ion-tab>
              <ion-tab tabIcon="briefcase" tabTitle="Items" [root]="items"></ion-tab>
              <ion-tab tabIcon="pin" tabTitle="Locations" [root]="locations"></ion-tab>
              <ion-tab tabIcon="people" tabTitle="Contacts" [root]="contacts"></ion-tab>
            </ion-tabs>`
})

export class TabsPage {

  home: any;
  items: any;
  locations:any;
  contacts:any;

  constructor() {
    this.home = CurrentLocationPage;
    this.items = ItemListPage;
    this.locations = LocationListPage;
    this.contacts = ContactListPage;
  }

}
