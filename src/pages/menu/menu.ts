import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { PresentationPage } from '../presentation/presentation';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {}

  /* Slide up an action sheet with 3 options
   - Start a new game;
   - Continue the saved check point and;
   - Cancel or exit from the action sheet */
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'START THE GAME',
      buttons: [
        {
          text: 'New Game',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push(PresentationPage);
          }
        },
        {
          text: 'Continue',
          role: 'destructive',
          handler: () => {
            console.log('Continue');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
 
    actionSheet.present();
  }

  openPage(index) {
    switch (index) {
      case 1:
        this.navCtrl.push(OptionsPage);
        break;
      case 2:
        
        break;
      default:
        this.presentActionSheet();
        break;
    }
  }


}
