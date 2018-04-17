import { Injectable } from '@angular/core';
import { IItem } from '../interface/item';

@Injectable()
export class ItemProvider {

  private _startTime;
  private _finishTime;

  constructor() {
    console.log('Hello ItemProvider Provider');
  }

  analyseItem(item: IItem) {
    let now = new Date();
    this._startTime = Date.parse(new Date().toString());
    console.log(this._startTime);
  }

  finishAnalyse() {
    
  }
}
