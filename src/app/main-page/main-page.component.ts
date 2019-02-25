import {Component, OnInit} from '@angular/core';
import {StopService} from '../../services/stop.service';
import {Stop} from '../../models/Stop';
import {StopInfo} from '../../models/StopInfo';
import {Route} from '../../models/Route';
import {DateRoute} from '../../models/DateRoute';
import {StopSchedule} from '../../models/StopSchedule';
import {Router} from '@angular/router';

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
    private stopService: StopService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  getStop(input) {
      this.router.navigate(['/stop'], {queryParams: {stop_id: JSON.stringify(input.value)}}).then();
    }

  getValue(input) {
    this.inputValue = input.value;
  }
}
