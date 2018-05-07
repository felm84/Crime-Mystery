import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { PresentationPage } from '../presentation/presentation';
import { TabsPage } from '../tabs/tabs';
import { SaveProvider } from '../../providers/save/save';

@Component({
  selector: 'page-menu',
  template: `<!-- Main menu to be added into home.html when app is compiled -->
              <ion-grid>
                <ion-row>
                  <ion-col></ion-col>
                  <ion-col col-8>
                    <button ion-button strong block *ngFor="let option of menu" 
                    (click)="startGame()">{{option}}</button>
                  </ion-col>
                  <ion-col></ion-col>
                </ion-row>
              </ion-grid>`
})

export class MenuPage {

  // menu[] holds all menu options to be looped into the template 
  private menu: string[] = ["Start Game"]; 

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

  startGame() {
    this._save.storage.clear();
    this._save.storage.get(this._save.saveKey)
    .then((val) => {
      if (val !== null) {
          let loading = this.loadingCtrl.create({
          content: 'Loading game...',
          dismissOnPageChange: true
        });
        loading.onDidDismiss(() => {
          this.navCtrl.push(TabsPage);
        });
        loading.present();
        
        this._save.storage.get(this._save.saveKey)
        .then(val => this._save.loadGame(val))
        .then(() => this._save.saveGame())
        .then(() => loading.dismiss());
      } else {
        this.navCtrl.push(PresentationPage);
      }
    });
  }

}
