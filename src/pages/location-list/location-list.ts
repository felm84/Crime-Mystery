import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {

  public locations:any;

  constructor(private location: LocationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationListPage');
    this.location.getLocations()
    .subscribe( data => this.locations = data);
  }

}
