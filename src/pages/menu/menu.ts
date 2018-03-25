import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { OptionsPage } from '../options/options';

@Component({
  selector: 'page-menu',
  template: `<!-- Main menu to be added into home.html when app is compiled -->
              <ion-grid>
                <ion-row>
                  <ion-col></ion-col>
                  <ion-col col-8>
                    <button ion-button block *ngFor="let option of menu; let i = index" 
                    (click)="openPage(i)">{{option}}</button>
                  </ion-col>
                  <ion-col></ion-col>
                </ion-row>
              </ion-grid>`
})

export class MenuPage {

  menu: string[] = ["Start", "Option", "Exit"]; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(index) {
    switch (index) {
      case 1:
        this.navCtrl.push(OptionsPage);
        break;
      case 2:
        
        break;
      default:
        this.navCtrl.push(TabsPage);
        break;
    }
  }


}
