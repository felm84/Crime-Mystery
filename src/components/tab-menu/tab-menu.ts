import { Component } from '@angular/core';

import { ListItemsPage } from '../../pages/list-items/list-items';
import { ListLocationPage } from '../../pages/list-location/list-location';
import { ListNpcPage } from '../../pages/list-npc/list-npc';

@Component({
  selector: 'tab-menu',
  templateUrl: 'tab-menu.html'
})
export class TabMenuComponent {

  items = ListItemsPage;
  locations = ListLocationPage;
  contacts = ListNpcPage;

  constructor() {
    console.log('Hello TabMenuComponent Component');
  }

}
