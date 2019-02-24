import {StopSchedule} from './StopSchedule';

export class StopInfo {
  constructor(
    public stopName: string,
    public stopSchedules: StopSchedule[]
  ){}
}
