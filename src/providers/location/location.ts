import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ILocation } from './../classes/location';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LocationProvider {

  private _url = "../../assets/data/locations.json";

  constructor(private http: HttpClient) {}

  getLocations(): Observable<ILocation[]> {
      return this.http.get<ILocation[]>(this._url);
  }

}
