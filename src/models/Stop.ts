import {Route} from './Route';

export class Stop {
  constructor(
    public name: string,
    public routes: Route[]
  ){}
}
