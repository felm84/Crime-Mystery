import { DataProvider } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemService {

    private items = [];
    
    constructor(data: DataProvider) {
        data.generateItems("../../assets/data/items.json")
          .subscribe( data => this.items = data);
      }
}