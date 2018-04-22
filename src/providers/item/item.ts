import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { IItem } from '../interface/item';
import { AlertController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../location/location';
import { DataProvider } from '../data/data';

@Injectable()
export class ItemProvider {

  public collectedItems: IItem[] = [];
  public analysingItems: any[] = [];
  public itemsReady: any[] = [];
  public warrantInProcess: boolean = false;

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
  addItemsToColletion(itemsArray: IItem[]) {
    if (itemsArray.length === 0) {
      this.presentAlert('No more items', 'No more items in this area, please try another location.');
    } else {
      this.collectedItems = this.collectedItems.concat(itemsArray);
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

  convertDate(time: number): string {
    let days = Math.floor(time / 86400);
    time -= days * 86400;
    let hours = Math.floor(time / 3600) % 24;
    time -= hours * 3600;
    let minutes = Math.floor(time / 60) % 60;
    time -= minutes * 60;
    let seconds = time % 60;
    return [
      days + 'd',
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');;
  }

  // DONE and WORKING
  analyseItem(item: IItem): boolean {
    let finish = Date.now() + (item.analyse_time * 60000);
    let counter = new Observable<number>();
    let subscription = new Subscription();

    let tempItem = {
      item: item,
      finish: finish,
      counter: ''
    }

    counter = Observable.interval(1000).map(x => {
      return Math.floor((finish - new Date().getTime()) / 1000);
    });
    subscription = counter.subscribe(x => {
      if (x >= 0) {
        tempItem.counter = this.convertDate(x)
      } else {
        subscription.unsubscribe();
        let index = this.analysingItems.findIndex(x => x.item.id === item.id);
        let ready = this.analysingItems.splice(index, 1);
        this.itemsReady.push(ready[0].item);
      }
    });

    this.analysingItems.push(tempItem);
    this.removeItem(item);

    console.log(tempItem);
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

  /* removeItem(item) method
   @param item - type from interface IItem
   Removes the selected item from player's itemList[].
   It first identify the item index in the list then
   slice it off from. */
  removeItem(item: IItem) {
    let index = this.collectedItems.indexOf(item);
    this.collectedItems.splice(index, 1);
    console.log(item.name + ' - removed.')
  }
}
