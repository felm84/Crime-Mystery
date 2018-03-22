import { DataProvider } from '../../providers/data/data';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  title: any;
  constructor(data: DataProvider) {
    data.fetchData();
  }

}
