import { Component, OnInit } from '@angular/core';
import {StopService} from '../../services/stop.service';
import {Stop} from '../../models/Stop';
import {StopInfo} from '../../models/StopInfo';
import {Route} from '../../models/Route';
import {DateRoute} from '../../models/DateRoute';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  inputValue = '';
  generalName = '';
  stops: StopInfo[];

  constructor(
    private stopService: StopService
  ) { }

  ngOnInit() {
  }
  getStop(input) {
    console.log(input.value);
    this.stopService.getStopInfo(input.value).subscribe((res) => {
      console.log(res);
      let stops = [];
      let routes = [];
      let dateRoutes = [];
      this.generalName = res.name;
      for(let stop of res.stops) {

        if(stop.routes) {
          for (let route of stop.routes) {

             for(let time of route.stop_times) {
               let dateRoute = new DateRoute(time.shape, time.departure_timestamp, time.departure_time);
                dateRoutes.push(dateRoute);
                console.log(dateRoutes);
             }
            let Route1 = new Route(route.name, dateRoutes);
             console.log(routes);
             routes.push(Route1);
             }
          }
        let Stop1 = new Stop(stop.name, routes);
        stops.push(Stop1);
        }
      console.log(stops);
    });
  }
  getValue(input) {
    this.inputValue = input.value;
  }
}
