import { Pc } from "./pc";
import { Router } from "./router";
import { Switch } from "./switch";
import { LinkDto } from './link';

export class Simulation {
  public id: number;
  public dateAdd: Date;
  public dateEdit: Date;
  public pcs: Pc[];
  public routers: Router[];
  public switches: Switch[];
  public links:LinkDto[];
}
