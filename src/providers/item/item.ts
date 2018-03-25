import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IItem } from './../classes/item';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemProvider {

  private _url = "../../assets/data/items.json";

  constructor(private http: HttpClient) {}

  getItems(): Observable<IItem[]> {
      return this.http.get<IItem[]>(this._url);
  }

}
