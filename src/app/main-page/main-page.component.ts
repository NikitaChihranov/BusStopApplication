import {Component, OnInit} from '@angular/core';
import {StopService} from '../../services/stop.service';
import {Stop} from '../../models/Stop';
import {StopInfo} from '../../models/StopInfo';
import {Route} from '../../models/Route';
import {DateRoute} from '../../models/DateRoute';
import {StopSchedule} from '../../models/StopSchedule';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  inputValue = '';
  generalName = '';
  stopInfoArray: StopInfo[] = [];


  constructor(
    private stopService: StopService
  ) {
  }

  ngOnInit() {
  }

  getStop(input) {
    this.stopService.getStopInfo(input.value).subscribe((res) => {
      console.log(res);
      let stops = [];
      this.generalName = res.name;
      for (let stop of res.stops) {
        let routes = [];
        if (stop.routes) {
          for (let route of stop.routes) {
            let dateRoutes = [];
            for (let time of route.stop_times) {
              let dateRoute = new DateRoute(time.shape, time.departure_timestamp, time.departure_time);
              dateRoutes.push(dateRoute);
            }
            let Route1 = new Route(route.name, dateRoutes);
            routes.push(Route1);
          }
        }
        let Stop1 = new Stop(stop.name, routes);
        stops.push(Stop1);
      }
      console.log(stops);
      for (let stop of stops) {
        let stopSchedules = [];
        for (let route of stop.routes) {
          for (let eachStop of route.stop_times) {
            let stopTime = new StopSchedule(route.name, eachStop.departure_timestamp);
            stopSchedules.push(stopTime);
          }
        }
        let newStopInfo = new StopInfo(stop.name, stopSchedules);
        this.stopInfoArray.push(newStopInfo);
      }
      console.log(this.stopInfoArray);
    });
  }

  getValue(input) {
    this.inputValue = input.value;
  }
}
