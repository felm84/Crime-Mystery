import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CurrentLocationPage } from '../current-location/current-location';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentationPage');
  }

  investigateCrime() {
    this.navCtrl.push(TabsPage);
  }

}
