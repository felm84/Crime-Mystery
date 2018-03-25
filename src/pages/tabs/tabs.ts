import { Component } from '@angular/core';
import { CurrentLocationPage } from './../current-location/current-location';
import { ListPage } from '../list/list';

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
    this.items = ListPage;
    this.locations = ListPage;
    this.contacts = ListPage;
  }

}
