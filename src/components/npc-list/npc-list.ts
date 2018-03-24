import { Component } from '@angular/core';

import { DataProvider } from '../../providers/services/data.service';

/**
 * Generated class for the NpcListComponent component.
 */
@Component({
  selector: 'npc-list',
  templateUrl: 'npc-list.html'
})
export class NpcListComponent {

  constructor(private npc: DataProvider) {
    console.log('Hello NpcListComponent Component');
  }

}
