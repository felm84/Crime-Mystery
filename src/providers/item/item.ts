import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { IItem } from '../interface/item';
import { DataProvider } from '../data/data';
import { AlertProvider } from '../alert/alert';
import { SaveProvider } from '../save/save';

@Injectable()
export class ItemProvider {

  //region PROPERTIES
  public collectedItems: IItem[] = [];
  public analysingItems: any[] = [];
  public itemsReady: any[] = [];
  public warrantInProcess: boolean = false;
  //endregion

  /**
   * ItemProvider constructor
   * @param _alert type from AlertProvider
   * @param _data type from DataProvider
   * All parameter injected into the ItemProvider class, so they can be
   * used in the methods and properties.
   */
  constructor(
    private _alert: AlertProvider,
    private _data: DataProvider
  ) {
    console.log('ItemProvider******');
  }

  /** addItem(itemsArray) method
   * @param item - type from interface IItem
   * Adds all found items to player's itemList[]. This list is 
   * displayed in the item-list.html.
   */
  addItemsToColletion(itemsArray: IItem[]) {
    this.collectedItems = this.collectedItems.concat(itemsArray);
    this._alert.presentAlert('Items Found', 'You have found some items. Please, check you bag of items.');
  }

  /**
   * converDate() method
   * @param time type from number - date in milliseconds
   * @returns date in string
   * Converts date from milliseconds to day and time.
   */
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

  /**
   * analyseItem()
   * @param item type from IItem - item to be analysed
   * @param f type from number - finish time in millisends from saved data
   * @returns type from boolean
   * Checks if f is null or has finish time already assigned, then
   * a new Observable<numbe> is assigned to counter and Subscription to
   * subscription, both together work as countdown.
   * With an interval of 1 second, it checks if finish time has been
   * reached, removes from analysingItems[] and pushes into itemsReady[].
   */
  analyseItem(item: IItem, f: number): boolean {
    const found = this.analysingItems.find((itemInAnalyse) => item.id === itemInAnalyse.item.id);
    if (found === undefined) {
      if(item.id === 100) {
        this.warrantInProcess = true;
      }
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
    }
    return true;
  }

  /**
   * findItem(id): IItem method
   * @param id type from number - item id number
   * @returns type from IItem
   * Searches for the index number that has the same item id
   * of parameter's id, then it returns an IItem.
   */
  findItem(id: number): IItem {
    return this._data.itemsArray[
      this._data.itemsArray.findIndex(item => item.id === id)
    ];
  }

  /**
   * removeItem(item) method
   * @param item type from interface IItem
   * Removes the selected item from player's itemList[].
   * It first identify the item index in the list then
   * slice it off from. */
  removeItem(item: IItem) {
    let index = this.collectedItems.indexOf(item);
    this.collectedItems.splice(index, 1);
    console.log(item.name + ' - removed.')
  }
}
