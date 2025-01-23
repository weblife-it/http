import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Buffer } from 'buffer';
import { Observable, catchError, retry, throwError } from 'rxjs';

export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

export interface ConfigTicketAlfresco {
  entry: {
    id: string;
    userId: string;
  }
}

@Injectable()
export class ConfigService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getProgrammazione() {

    const url ='http://localhost:8080/demo/programmazione'
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;charset=UTF-8',
        'Accept':  'application/json',
        //'mode': 'no-cors',
        //'Access-Control-Allow-Origin': '*',

      })
    };

    return this.http.get<Config>(url, httpOptions);

   }

   getStorico() {

    const url ='http://localhost:8080/demo/storico'
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;charset=UTF-8',
        'Accept':  'application/json',
        //'mode': 'no-cors',
        //'Access-Control-Allow-Origin': '*',

      })
    };

    return this.http.get<Config>(url, httpOptions);

   }

   getTicketAlfresco() {

    // curl -H "Content-Type: application/json" -d "{\"userId\":\"admin\",\"password\":\"admin\"}" http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets

    const urlAlfresco ='http://localhost:4200/alfresco/api/-default-/public/authentication/versions/1/tickets';
    const body = '{"userId":"admin","password":"admin"}';
    var esito = this.http.post<ConfigTicketAlfresco>(urlAlfresco, body);
    console.log('Ticket: '+esito.forEach);    

    return esito;
   }

   getConfigAlfrescoTicket(id: any) {

    // curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/discovery' | jq

    //var alfresco = 'http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser';
    //alfresco ='http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications?skipCount=0&maxItems=100';
    //alfresco = 'http://localhost:8080/alfresco/s/api/admin/restrictions';
    //const alfresco ='http://192.168.125.160:8080/alfresco/api/-default-/public/workflow/versions/1/deployments';
    //const urlAlfresco ='http://localhost:8080/alfresco/api/-default-/public/workflow/versions/1/deployments';
    //const urlAlfresco ='http://localhost:4200/alfresco/api/-default-/public/workflow/versions/1/deployments';
    //const urlAlfresco ='http://localhost:4200/alfresco/api/-default-/public/alfresco/versions/1/sites';
    const urlAlfresco ='http://localhost:4200/alfresco/api/discovery'

    //let credenziali = 'TICKET_7e1bc8feae40c538112fe7d3882ad00ef21d7cc8';
    const credenziali = id;
    const token = Buffer.from(credenziali, 'utf8').toString('base64');    
    const authorization = 'Basic '+ token;

    let headers = new HttpHeaders();
    //headers = headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers = headers.append('Accept', 'application/json;charset=UTF-8');
    headers = headers.append('Authorization', authorization);
    //headers = headers.append('Origin', 'localhost');
    //headers = headers.append('Accept', '*/*');
    //headers = headers.append('X-Frame-Options', 'SAMEORIGIN');
    //headers = headers.append('Access-Control-Allow-Origin', '*');
    //headers = headers.append('mode', 'no-cors');
    //headers = headers.append('x-Flatten', 'true');
    //headers = headers.append('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');
    //headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
   

    const httpOptions = {
      headers: headers
    };

    console.log('Authorization: '+authorization);
    console.log('httpOptions: '+JSON.stringify(httpOptions));

    
    return this.http.get<Config>(urlAlfresco, httpOptions);

   }

  getConfig() {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getConfig_1() {
    return this.http.get<Config>(this.configUrl);
  }

  getConfig_2() {
    // now returns an Observable of Config
    return this.http.get<Config>(this.configUrl);
  }

  getConfig_3() {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  getConfig_untyped_response() {
    return this.http.get(this.configUrl);
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }

}
