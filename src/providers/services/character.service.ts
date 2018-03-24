import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ICharacter } from '../classes/character';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CharacterService {

    private _url = "../../assets/data/characters.json";

    constructor(private http: HttpClient) {}

    getCharacters(): Observable<ICharacter[]> {
        return this.http.get<ICharacter[]>(this._url);
    }
}
