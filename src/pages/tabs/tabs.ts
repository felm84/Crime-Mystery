import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  template: `<ion-tabs>
              <ion-tab tabIcon="briefcase" tabTitle="Items" [root]="items"></ion-tab>
              <ion-tab tabIcon="pin" tabTitle="Locations" [root]="locations"></ion-tab>
              <ion-tab tabIcon="people" tabTitle="Contacts" [root]="contacts"></ion-tab>
            </ion-tabs>`
})

export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
