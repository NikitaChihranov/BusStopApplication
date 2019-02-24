import {DateRoute} from './DateRoute';

export class Route{
  constructor(
    public name: string,
    public stop_times: DateRoute[]
  ){}
}
