import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ISpeech } from './../classes/speech';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SpeechService {

    private _url = "../../assets/data/speeches.json";

    constructor(private http: HttpClient) {}

    getSpeeches(): Observable<ISpeech[]> {
        return this.http.get<ISpeech[]>(this._url);
    }
}