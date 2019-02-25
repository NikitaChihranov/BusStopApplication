import {Component, OnInit} from '@angular/core';
import {DateRoute} from '../../models/DateRoute';
import {Route} from '../../models/Route';
import {Stop} from '../../models/Stop';
import {StopSchedule} from '../../models/StopSchedule';
import {StopInfo} from '../../models/StopInfo';
import {StopService} from '../../services/stop.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-stop-page',
  templateUrl: './stop-page.component.html',
  styleUrls: ['./stop-page.component.css']
})
export class StopPageComponent implements OnInit {
  stopInfoArray: StopInfo[] = [];
  stopId = '';

  constructor(
    private stopService: StopService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((response) => {
      this.stopId = JSON.parse(response.stop_id);
      this.stopService.getStopInfo(this.stopId).subscribe((res) => {

          this.stopInfoArray = [];
          let stops = [];
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
          for (let stop of stops) {
            let stopSchedules = [];
            for (let route of stop.routes) {
              for (let eachStop of route.stop_times) {
                let stopTime = new StopSchedule(route.name, eachStop.departure_time);
                stopSchedules.push(stopTime);
              }
            }
            let newStopInfo = new StopInfo(stop.name, stopSchedules);
            this.stopInfoArray.push(newStopInfo);
          }
          for (const stopInfo of this.stopInfoArray) {
            console.log(1);
            stopInfo.stopSchedules.sort((a, b) => {
              if (a.departureTime > b.departureTime) {
                return 1;
              } else if (a.departureTime < b.departureTime) {
                return -1;
              }
            });
            console.log(this.stopInfoArray);
          }

      }, (err) =>{
        this.router.navigate(['/notFound']).then();
      });
    });
  }
}
