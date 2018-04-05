import { Component } from '@angular/core';
import { CurrentLocationPage } from './../current-location/current-location';
import { ItemListPage } from '../item-list/item-list';
import { LocationListPage } from '../location-list/location-list';
import { ContactListPage } from '../contact-list/contact-list';

@Component({
  selector: 'page-tabs',
  template: `<ion-tabs>
              <ion-tab tabIcon="pin" tabTitle="Location" [root]="location"></ion-tab>
              <ion-tab tabIcon="briefcase" tabTitle="Items" [root]="items"></ion-tab>
              <ion-tab tabIcon="map" tabTitle="Maps" [root]="maps"></ion-tab>
              <ion-tab tabIcon="people" tabTitle="Contacts" [root]="contacts"></ion-tab>
            </ion-tabs>`
})

export class TabsPage {

  location: any;
  items: any;
  maps:any;
  contacts:any;

  constructor() {
    this.location = CurrentLocationPage;
    this.items = ItemListPage;
    this.maps = LocationListPage;
    this.contacts = ContactListPage;
  }

}
