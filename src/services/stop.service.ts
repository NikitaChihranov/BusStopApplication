import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StopInfo} from '../models/StopInfo';
import {Stop} from '../models/Stop';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StopService{
  constructor(
    private http: HttpClient
  ){
  }

  getStopInfo(stopId): Observable<any> {
      const headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      return this.http.get<any>(` https://cors-anywhere.herokuapp.com/https://myttc.ca/${stopId}.json`, {headers: headers});
    }
}
