import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ISpeech } from '../../providers/classes/speech';

@Component({
  selector: 'page-current-npc',
  templateUrl: 'current-npc.html',
})
export class CurrentNpcPage {


  //public speech: number[] = [1, 2, 3, 4];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentNpcPage');
  }

}
