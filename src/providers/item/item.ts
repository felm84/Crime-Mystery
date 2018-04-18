import { Injectable } from '@angular/core';
import { IItem } from '../interface/item';
import { AlertController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';

@Injectable()
export class ItemProvider {

  public items: IItem[] = [];
  public itemsAnalysing: any[] = [];
  private _item;
  private _startTime;
  private _finishTime;
  private _itemsDone: any[] = [];

  private _itemClass = {
    item: this._item,
    start: this._startTime,
    finish: this._finishTime,
  }

  constructor(
    public loadingCtrl: LoadingController,
    private _data: DataProvider,
    private alertCtrl: AlertController
  ) {
    console.log('ItemProvider******');
  }

  /* addItem(itemsArray) method
   @param item - type from interface IItem
   Adds found items to player's itemList[]. This list is 
   displayed in the item-list.html  */
  addItems(itemsArray: IItem[]) {
    if (itemsArray.length === 0) {
      this.presentAlert('No more items', 'No more items in this area, please try another location.');
    } else {
      this.items = this.items.concat(itemsArray);
      this.presentAlert('Items found', 'You have found some items. Please, check you bag of items.');
    }
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }

  startTimer(minutes: number) {
    let seconds = 0;
    let counter = setInterval(() => {
      if (seconds === 0 && minutes > 0) {
        minutes--;
        seconds = 59;
      } else if ( seconds === 0 && minutes === 0) {
        clearTimeout(counter);
      }else {
        seconds--;
      }
      console.log(minutes + " : " + seconds);
    }, 1000);
  }

  // Testing
  analyseItem(item: IItem): boolean {
    this._itemClass = {
      item: item,
      start: 0,
      finish: 30
    }
    this.itemsAnalysing.push(this._itemClass)
    //this.startTimer(1);
    return true;
  }

  /* findItem(id): IItem method
   @param id - type from number
   searches for the index number that has the same item id
   as the id passed as a parameter, then it returns an IItem */
   findItem(id: number): IItem {
    return this._data.itemsArray[
      this._data.itemsArray.findIndex(item => item.id === id)
    ];
  }
}
