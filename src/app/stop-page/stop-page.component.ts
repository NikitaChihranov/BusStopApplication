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
        StopService.handleStopRes(res).subscribe((value) => {
            this.stopInfoArray = value;
          });
      }, (err) => {
        this.router.navigate(['/notFound']).then();
      });
    });
  }
}
