import { Component } from '@angular/core';

/**
 * Generated class for the StartMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'start-menu',
  templateUrl: 'start-menu.html'
})
export class StartMenuComponent {

  text: string;

  constructor() {
    console.log('Hello StartMenuComponent Component');
    this.text = 'Hello World';
  }

}
