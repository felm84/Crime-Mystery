import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListLocationPage } from './list-location';

@NgModule({
  declarations: [
    ListLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ListLocationPage),
  ],
})
export class ListLocationPageModule {}
