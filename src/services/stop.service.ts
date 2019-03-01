import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {StopInfo} from '../models/StopInfo';
import {Stop} from '../models/Stop';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StopResponse} from '../models/StopResponse';
import {DateRoute} from '../models/DateRoute';
import {Route} from '../models/Route';
import {StopSchedule} from '../models/StopSchedule';

@Injectable({
  providedIn: 'root'
})
export class StopService {
  constructor(
    private http: HttpClient
  ) {
  }

  static handleStopRes(stopRes: StopResponse): Observable<StopInfo[]> {
     const stopInfoArray = [];
     const stops = [];
    for ( const stop of stopRes.stops) {
       const routes = [];
      if (stop.routes) {
        for (const route of stop.routes) {
          const dateRoutes = [];
          for (const time of route.stop_times) {
            const dateRoute = new DateRoute(time.shape, time.departure_timestamp, time.departure_time);
            dateRoutes.push(dateRoute);
          }
          const Route1 = new Route(route.name, dateRoutes);
          routes.push(Route1);
        }
      }
      const Stop1 = new Stop(stop.name, routes);
      stops.push(Stop1);
    }
    for (const stop of stops) {
      const stopSchedules = [];
      for (const route of stop.routes) {
        for (const eachStop of route.stop_times) {
          let date = new Date();
          let time = eachStop.departure_time.split(':');
          let minutes = time[1].split('');
          minutes.splice(time[1].length, 1);
          time[1] = minutes;
          console.log(time);
          let pa = eachStop.departure_time.split('');
          let dayTime = pa[pa.length];
          date.setHours(time[0]);
          date.setMinutes(time[1]);
          console.log(date);
          const stopTime = new StopSchedule(route.name, eachStop.departure_time);
          stopSchedules.push(stopTime);
        }
      }
      const newStopInfo = new StopInfo(stop.name, stopSchedules);
      stopInfoArray.push(newStopInfo);
    }
    for (const stopInfo of stopInfoArray) {
      stopInfo.stopSchedules.sort((a, b) => {
        if (a.departureTime > b.departureTime) {
          return 1;
        } else if (a.departureTime < b.departureTime) {
          return -1;
        }
      });
    }
    return of(stopInfoArray);
  }

  getStopInfo(stopId): Observable<StopResponse> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get<StopResponse>(` https://cors-anywhere.herokuapp.com/https://myttc.ca/${stopId}.json`, {headers: headers});
  }
}
