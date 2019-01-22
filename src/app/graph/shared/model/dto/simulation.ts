import { Pc } from "./pc";
import { Router } from "./router";
import { Switch } from "./switch";
import { PcSwitch } from "./pc-switch";
import { RouterSwitch } from "./router-switch";

export class Simulation {
  public id: number;
  public pcs: Pc[];
  public routers: Router[];
  public switches: Switch[];
  public routerSwitches: RouterSwitch[];
  public pcSwitches: PcSwitch[];
}
