import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentLocationPage } from './current-location';

@NgModule({
  declarations: [
    CurrentLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentLocationPage),
  ],
})
export class CurrentLocationPageModule {}
