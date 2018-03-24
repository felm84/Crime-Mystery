import { Component } from '@angular/core';

import { ListItemsPage } from '../../pages/list-items/list-items';
import { ListLocationPage } from '../../pages/list-location/list-location';
import { ListNpcPage } from '../../pages/list-npc/list-npc';

@Component({
  selector: 'tab-menu',
  template: `<ion-tabs>
              <ion-tab tabIcon="briefcase" tabTitle="Items" [root]="items"></ion-tab>
              <ion-tab tabIcon="pin" tabTitle="Locations" [root]="locations"></ion-tab>
              <ion-tab tabIcon="people" tabTitle="Contacts" [root]="contacts"></ion-tab>
            </ion-tabs>`
})

export class TabMenuComponent {
  
  items = ListItemsPage;
  locations = ListLocationPage;
  contacts = ListNpcPage;

  constructor() {
    console.log('Hello TabMenuComponent Component');
  }

}
