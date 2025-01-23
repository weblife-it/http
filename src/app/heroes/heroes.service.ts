import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, catchError, map } from 'rxjs';

import { Hero } from './hero';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class HeroesService {
  urlProgrammazione = 'http://localhost:8080/demo/programmazione';
  urlStorico = 'http://localhost:8080/demo/storico';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  getProgrammazine(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.urlProgrammazione)
      .pipe(
        catchError(this.handleError('getProgrammazine', []))
      );
  }

  getStorico(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.urlStorico)
      .pipe(
        catchError(this.handleError('getStorico', []))
      );
  }

  searchFilm(term: string): Observable<Hero[]> {

    const id  =  parseInt(term, 10);
    const urlStoricoId = this.urlStorico +"/"+ id;

    return this.http.get<Hero[]>(urlStoricoId)
      .pipe(
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

}
