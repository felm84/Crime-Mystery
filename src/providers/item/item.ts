import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { IItem } from '../interface/item';
import { DataProvider } from '../data/data';
import { AlertProvider } from '../alert/alert';

@Injectable()
export class ItemProvider {

  public collectedItems: IItem[] = [];
  public analysingItems: any[] = [];
  public itemsReady: any[] = [];
  public warrantInProcess: boolean = false;

  constructor(
    private _alert: AlertProvider,
    private _data: DataProvider
  ) {
    console.log('ItemProvider******');
  }

  /* addItem(itemsArray) method
   @param item - type from interface IItem
   Adds found items to player's itemList[]. This list is 
   displayed in the item-list.html  */
  addItemsToColletion(itemsArray: IItem[]) {
    this.collectedItems = this.collectedItems.concat(itemsArray);
    this._alert.presentAlert('Items Found', 'You have found some items. Please, check you bag of items.');

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
  analyseItem(item: IItem, f: number): boolean {
    let finish = f ? f : Date.now() + (item.analyse_time * 60000);
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
        let ready = this.analysingItems.splice(index, 1); //Remove from analysingItems[]
        this.itemsReady.push(ready[0].item); //Push only item: IItem into itemsReady[]
      }
    });

    this.analysingItems.push(tempItem);
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
