import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListNpcPage } from './list-npc';

@NgModule({
  declarations: [
    ListNpcPage,
  ],
  imports: [
    IonicPageModule.forChild(ListNpcPage),
  ],
})
export class ListNpcPageModule {}
