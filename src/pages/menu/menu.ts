import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { PresentationPage } from '../presentation/presentation';
import { OptionsPage } from '../options/options';
import { TabsPage } from '../tabs/tabs';
import { SaveProvider } from '../../providers/save/save';

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

  // menu[] holds all menu options to be looped into the template 
  private menu: string[] = ["Start", "Option", "Exit"]; 

  /**
   * MenuPage contructor
   * @param _save type from SaveProvider
   * @param loadingCtrl type from LoadinController
   * @param navCtrl type from NavController
   * @param actionSheetCtrl type from ActionSheetController
   * All parameter injected into the MenuPage class, so they can be
   * used in the methods and properties.
   */
  constructor(
    private _save: SaveProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public actionSheetCtrl: ActionSheetController
  ) {}

  /**
   * presentActionSheet() method
   *  Slide up an action sheet with 3 options:
   * - New Game: pushes PresentaionPage on top of navCtrl;
   * - Continue: loads the last saved check point in the game and
   * pushes TabsPage on top of navCtrl;
   * - Cancel: exits from the action sheet.
   */
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
            this._save.storage.get(this._save.saveKey)
            .then(val => this._save.loadGame(JSON.parse(val)))
            .then(() => this._save.saveGame());
            let loading = this.loadingCtrl.create({
              content: 'Loading game...',
              duration: 1000,
              dismissOnPageChange: true
            });
            loading.onDidDismiss(() => {
              this.navCtrl.push(TabsPage);
            });
            loading.present();
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

  /**
   * openPage() method
   * @param index type from number
   * Opens a page or present an action sheet according to the index number.
   */
  openPage(index: number) {
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
