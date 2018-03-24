import { Component } from '@angular/core';

/**
 * Generated class for the StartMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'start-menu',
  template: `<!-- Main menu to be added into home.html when app is compiled -->
              <ion-grid>
                <ion-row>
                  <ion-col></ion-col>
                  <ion-col col-8>
                    <button ion-button block *ngFor="let option of menu" 
                    (click)="openPage($event)">{{option}}</button>
                  </ion-col>
                  <ion-col></ion-col>
                </ion-row>
              </ion-grid>`
})
export class StartMenuComponent {

  menu: string[] = ["Start", "Option", "Exit"]; 

  constructor() {
    console.log('Hello StartMenuComponent Component');
  }

  openPage(page) {
    console.log(page);
  }
}
