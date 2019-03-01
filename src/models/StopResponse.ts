import {Stop} from './Stop';

export class StopResponse {
  constructor(
    public name: string,
    public stops: Stop[]
  ) {
  }
}
